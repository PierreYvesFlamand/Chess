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
                const elem = document.getElementById(pawn.id);
                elem.classList.toggle('is-askSelection');

                // Mode is used to switch from show/hide possible moves
                if (mode) {
                    elem.addEventListener('click', function () {
                        ask_possible_moves(pawn, possible_moves, true);
                        pawn_sellection(false);
                    });
                    elem.addEventListener('mouseover', function () {
                        show_possible_moves(possible_moves, true);
                    });
                    elem.addEventListener('mouseout', function () {
                        show_possible_moves(possible_moves, false);
                    });
                } else {
                    const elemClone = elem.cloneNode(true);
                    elem.parentNode.replaceChild(elemClone, elem);
                }
            }
        });
    });
}

// Show all possible moves when hovering
function show_possible_moves(moves, mode) {
    moves.forEach((move) => {
        var elem = document.getElementById('pos-' + move.x + '-' + move.y);
        elem.classList.toggle('is-possible-move');
        if (!mode) {
            var elemClone = elem.cloneNode(true);
            elem.parentNode.replaceChild(elemClone, elem);
        }
    });
}

// Show clickable squares
function ask_possible_moves(pawn, moves, mode) {
    document.getElementById(pawn.id).classList.toggle('is-askedSelection');
    document.getElementById('grid').classList.toggle('grid-disable');
    moves.forEach((move) => {
        var elem = document.getElementById('pos-' + move.x + '-' + move.y);
        if (mode) {
            elem.addEventListener('click', function () {
                ask_possible_moves(pawn, moves, false);
                move_pawn(pawn, move);
            });
        } else {
            elem.classList.toggle('is-possible-move');
            var elemClone = elem.cloneNode(true);
            elem.parentNode.replaceChild(elemClone, elem);
        }
    });
}
