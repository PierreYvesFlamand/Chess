document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        document.querySelector('.modal').style.display = 'none';
        toggleModal({ modal: 'start' });
    }
};

function toggleModal({ modal = null, winner = null, pawnToPromote = null }) {
    const modalDiv = document.querySelector('.modal');
    modalDiv.style.display = modalDiv.style.display === 'none' ? 'flex' : 'none';

    const modals = {
        start: `
            <h1>Chess</h1>
            <h2>How to play</h2>
            <ul>
                <li>Hover a pawn to know which move it can performs</li>
                <li>Click a pawn and then a square to move the pawn</li>
            </ul>
            <h2>Rules availables</h2>
            <ul>
                <li>Pawn promotion (reach ennemy last first row with a pawn to promote it)</li>
                <li>Castling (click the king to perform it)</li>
            </ul>
            <button onclick="start_game()">Start the game</button>
        `,

        end: `
            <h1>Game end !</h1>
            <h2>${winner} player wins the game</h2>
            <button onclick="location.reload()">Play again</button>
        `,

        promotion: `
            <h1>Pawn promotion !</h1>
            <h2>Choose your promotion</h2>
            <button id="promot-q">Queen</button>
            <button id="promot-k">Knight</button>
            <button id="promot-b">Bishop</button>
            <button id="promot-r">Rook</button>
        `,
    };

    document.querySelector('.modal-card').innerHTML = modal ? modals[modal] : '';

    if (pawnToPromote) {
        document.querySelector('#promot-q').addEventListener('click', () => {
            pawn_promotion(pawnToPromote, 'queen');
            toggleModal({});
        });
        document.querySelector('#promot-k').addEventListener('click', () => {
            pawn_promotion(pawnToPromote, 'knight');
            toggleModal({});
        });
        document.querySelector('#promot-b').addEventListener('click', () => {
            pawn_promotion(pawnToPromote, 'bishop');
            toggleModal({});
        });
        document.querySelector('#promot-r').addEventListener('click', () => {
            pawn_promotion(pawnToPromote, 'rook');
            toggleModal({});
        });
    }
}

function start_game() {
    toggleModal({});
    pawn_sellection(true);
}

function next_turn() {
    currentPlayer = currentPlayer ? 0 : 1;
    pawn_sellection(true);
}

// Show all pawn that can actualy move
function pawn_sellection(mode) {
    Pawns[currentPlayer].forEach((pawns) => {
        pawns.forEach((pawn) => {
            const possible_moves = calculate_possible_moves(pawn);

            if (possible_moves.length != 0) {
                const node = document.getElementById(pawn.id);
                node.classList.toggle('is-askSelection');

                // Mode is used to switch from show/hide possible moves
                if (mode) {
                    node.addEventListener('click', function () {
                        ask_possible_moves(pawn, possible_moves, true);
                        pawn_sellection(false);
                    });
                    node.addEventListener('mouseover', function () {
                        show_possible_moves(possible_moves, true);
                    });
                    node.addEventListener('mouseout', function () {
                        show_possible_moves(possible_moves, false);
                    });
                } else {
                    const nodeClone = node.cloneNode(true);
                    node.parentNode.replaceChild(nodeClone, node);
                }
            }
        });
    });
}

// Show all possible moves when hovering
function show_possible_moves(moves, mode) {
    moves.forEach((move) => {
        const node = document.getElementById('pos-' + move.x + '-' + move.y);
        node.classList.toggle('is-possible-move');
        if (!mode) {
            const nodeClone = node.cloneNode(true);
            node.parentNode.replaceChild(nodeClone, node);
        }
    });
}

// Show clickable squares
function ask_possible_moves(pawn, moves, mode) {
    document.getElementById(pawn.id).classList.toggle('is-askedSelection');
    document.getElementById('grid').classList.toggle('grid-disable');

    moves.forEach((move) => {
        const node = document.getElementById('pos-' + move.x + '-' + move.y);
        if (mode) {
            node.addEventListener('click', function () {
                ask_possible_moves(pawn, moves, false);
                move_pawn(pawn, move);
            });
        } else {
            node.classList.toggle('is-possible-move');
            const nodeClone = node.cloneNode(true);
            node.parentNode.replaceChild(nodeClone, node);
        }
    });
}
