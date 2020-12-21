function start_game() {
    pawn_sellection(true);
}

// Initial call
start_game();

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

function move_pawn(pawnToMove, moveToDo) {
    // Do the move
    for (i = 0; i < Pawns[currentPlayer].length; i++) {
        for (j = 0; j < Pawns[currentPlayer][i].length; j++) {
            if (Pawns[currentPlayer][i][j].id == pawnToMove.id) {
                grid[pawnToMove.y][pawnToMove.x] = null;
                grid[moveToDo.y][moveToDo.x] = Pawns[currentPlayer][i][j];

                Pawns[currentPlayer][i][j].x = moveToDo.x;
                Pawns[currentPlayer][i][j].y = moveToDo.y;

                document.getElementById(pawnToMove.id).style.gridArea =
                    get_letter(moveToDo.y) + (moveToDo.x + 1);

                // Rook first move
                if (Pawns[currentPlayer][i][j].moveType === 'rook') {
                    if (Pawns[currentPlayer][i][j].first_move) {
                        Pawns[currentPlayer][i][j].first_move = false;
                    }
                }

                // King first move
                if (Pawns[currentPlayer][i][j].moveType === 'king') {
                    if (Pawns[currentPlayer][i][j].first_move) {
                        Pawns[currentPlayer][i][j].first_move = false;
                    }
                }

                i = 99;
                break;
            }
        }
    }

    // Do the kill if needed
    if (moveToDo.kill != null) {
        playerToKill = currentPlayer ? 0 : 1;
        for (i = 0; i < Pawns[playerToKill].length; i++) {
            for (j = 0; j < Pawns[playerToKill][i].length; j++) {
                if (Pawns[playerToKill][i][j].id == moveToDo.kill.id) {
                    document.getElementById(moveToDo.kill.id).style.display = 'none';
                    i = 99;
                    break;
                }
            }
        }

        if (moveToDo.kill.id == 'king-w') {
            alert('BLACK PLAYER WIN');
            location.reload();
        }

        if (moveToDo.kill.id == 'king-b') {
            alert('WHITE PLAYER WIN');
            location.reload();
        }
    }

    // Promote Pawn if needed
    let type;
    if (pawnToMove.moveType === 'pawn' && moveToDo.y == (currentPlayer ? 7 : 0)) {
        do {
            type = parseInt(prompt('Promotion du pion !\n\n1 : Reine\n2 : Cavalier\n3 : Fou\n4 : Tour'));
        } while (type < 1 || type > 4 || isNaN(type));

        switch (type) {
            case 1:
                type = 'queen';
                break;

            case 2:
                type = 'knight';
                break;

            case 3:
                type = 'bishop';
                break;

            case 4:
                type = 'rook';
                break;

            default:
                console.log('Switch error');
                break;
        }
        document.getElementById(pawnToMove.id).innerHTML = '<i class="fas fa-chess-' + type + '"></i>';
        for (i = 0; i < Pawns[currentPlayer].length; i++) {
            for (j = 0; j < Pawns[currentPlayer][i].length; j++) {
                if (Pawns[currentPlayer][i][j].id == pawnToMove.id) {
                    Pawns[currentPlayer][i][j].moveType = type;

                    i = 99;
                    break;
                }
            }
        }
    }

    // Roque if needed
    if (moveToDo.roque !== undefined) {
        let roque_move = {};

        switch (moveToDo.roque) {
            case 0:
                roque_move.i = 1;
                roque_move.j = 1;
                roque_move.k = 0;

                roque_move.x = 0;
                roque_move.y = 0;

                roque_move.x_to_do = 3;
                roque_move.y_to_do = 0;
                break;

            case 1:
                roque_move.i = 1;
                roque_move.j = 1;
                roque_move.k = 1;

                roque_move.x = 7;
                roque_move.y = 0;

                roque_move.x_to_do = 5;
                roque_move.y_to_do = 0;
                break;

            case 2:
                roque_move.i = 0;
                roque_move.j = 1;
                roque_move.k = 0;

                roque_move.x = 0;
                roque_move.y = 7;

                roque_move.x_to_do = 3;
                roque_move.y_to_do = 7;
                break;

            case 3:
                roque_move.i = 0;
                roque_move.j = 1;
                roque_move.k = 1;

                roque_move.x = 7;
                roque_move.y = 7;

                roque_move.x_to_do = 5;
                roque_move.y_to_do = 7;
                break;

            default:
                console.error('Switch error');
                break;
        }

        Pawns[roque_move.i][roque_move.j][roque_move.k].first_move = false;
        grid[roque_move.y][roque_move.x] = null;
        grid[roque_move.y_to_do][roque_move.x_to_do] = Pawns[roque_move.i][roque_move.j][roque_move.k];

        Pawns[roque_move.i][roque_move.j][roque_move.k].x = roque_move.x_to_do;
        Pawns[roque_move.i][roque_move.j][roque_move.k].y = roque_move.y_to_do;

        document.getElementById(Pawns[roque_move.i][roque_move.j][roque_move.k].id).style.gridArea =
            get_letter(roque_move.y_to_do) + (roque_move.x_to_do + 1);
    }

    // Next turn
    next_turn();
}

// * other function

function get_letter(value) {
    var letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    return letter[value];
}
