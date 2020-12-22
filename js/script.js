start_game();

function start_game() {
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
