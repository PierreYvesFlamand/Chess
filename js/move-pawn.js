function move_pawn(pawnToMove, moveToDo) {
    // Do the move
    for (i = 0; i < Pawns[currentPlayer].length; i++) {
        for (j = 0; j < Pawns[currentPlayer][i].length; j++) {
            const pawn = Pawns[currentPlayer][i][j];

            if (pawn.id == pawnToMove.id) {
                // Move in memory
                grid[pawnToMove.y][pawnToMove.x] = null;
                grid[moveToDo.y][moveToDo.x] = pawn;

                // Edit Pawns data
                pawn.x = moveToDo.x;
                pawn.y = moveToDo.y;

                // Move on CSS
                document.getElementById(pawnToMove.id).style.gridArea =
                    get_letter(moveToDo.y) + (moveToDo.x + 1);

                // Rook / King first move
                if (pawn.moveType === 'rook') {
                    if (pawn.first_move) {
                        pawn.first_move = false;
                    }
                }
                if (pawn.moveType === 'king') {
                    if (pawn.first_move) {
                        pawn.first_move = false;
                    }
                }

                // Sneak break because move is done
                i = Pawns[currentPlayer].length;
                break;
            }
        }
    }

    // Do the kill if needed
    if (moveToDo.kill != null) {
        playerToKill = currentPlayer ? 0 : 1;
        for (i = 0; i < Pawns[playerToKill].length; i++) {
            for (j = 0; j < Pawns[playerToKill][i].length; j++) {
                const pawn = Pawns[playerToKill][i][j];

                if (pawn.id == moveToDo.kill.id) {
                    document.getElementById(moveToDo.kill.id).style.display = 'none';

                    // Sneak break because kill id done
                    i = Pawns[playerToKill].length;
                    break;
                }
            }
        }

        // Fast reload for now
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
    if (pawnToMove.moveType === 'pawn' && moveToDo.y == (currentPlayer ? 7 : 0)) {
        let type;
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

        for (j = 0; j < Pawns[currentPlayer][0].length; j++) {
            const pawn = Pawns[currentPlayer][0][j];

            if (pawn.id === pawnToMove.id) {
                pawn.moveType = type;

                // Sneak break because promotion id done
                i = Pawns[currentPlayer][0].length;
                break;
            }
        }
    }

    // Castling if needed
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

function get_letter(value) {
    var letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    return letter[value];
}
