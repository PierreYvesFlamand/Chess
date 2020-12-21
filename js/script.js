function start_game() {
    pawn_sellection(true);
}

// Initial call
start_game();

function next_turn() {
    if (isBlackPlayer) {
        isBlackPlayer = 0;
        currentPlayer = 0;
    } else {
        isBlackPlayer = 1;
        currentPlayer = 1;
    }
    pawn_sellection(true);
}

function pawn_sellection(mode) {
    Pawns[currentPlayer].forEach((pawns) => {
        pawns.forEach((pawn) => {
            if (calculate_possible_moves(pawn).length != 0) {
                var elem = document.getElementById(pawn.id);
                elem.classList.toggle('is-askSelection');
                if (mode) {
                    elem.addEventListener('click', function () {
                        ask_possible_moves(pawn, calculate_possible_moves(pawn), true);
                        pawn_sellection(false);
                    });
                    elem.addEventListener('mouseover', function () {
                        show_possible_moves(calculate_possible_moves(pawn), true);
                    });
                    elem.addEventListener('mouseout', function () {
                        show_possible_moves(calculate_possible_moves(pawn), false);
                    });
                } else {
                    var elemClone = elem.cloneNode(true);
                    elem.parentNode.replaceChild(elemClone, elem);
                }
            }
        });
    });
}

function calculate_possible_moves(pawn) {
    var pos = {};
    var atPos;
    var possibleMoves = [];
    var i = 0;
    // * PAWN * //
    if (pawn.moveType == 'pawn') {
        // Pawn at any pos
        pos = { x: pawn.x, y: isBlackPlayer ? pawn.y + 1 : pawn.y - 1 };

        if (check_if_pos_is_reachable(pos) == 'empty') {
            pos.kill = null;
            possibleMoves[i++] = pos;
            // Pawn at start pos
            if (pawn.y == (isBlackPlayer ? 1 : 6)) {
                pos = { x: pawn.x, y: isBlackPlayer ? pawn.y + 2 : pawn.y - 2 };
                if (check_if_pos_is_reachable(pos) == 'empty') {
                    pos.kill = null;
                    possibleMoves[i++] = pos;
                }
            }
        }
        // Check if pawn can do a kill
        var posToCheck = [];
        i = 0;
        var tempPos = { x: pawn.x + 1, y: isBlackPlayer ? pawn.y + 1 : pawn.y - 1 };
        if (tempPos.x > -1 && tempPos.x < 8 && tempPos.y > -1 && tempPos.y < 8) {
            posToCheck[i++] = grid[tempPos.y][tempPos.x];
        }
        var tempPos = { x: pawn.x - 1, y: isBlackPlayer ? pawn.y + 1 : pawn.y - 1 };
        if (tempPos.x > -1 && tempPos.x < 8 && tempPos.y > -1 && tempPos.y < 8) {
            posToCheck[i++] = grid[tempPos.y][tempPos.x];
        }
        posToCheck.forEach((pos) => {
            if (pos != null && pos.color == (isBlackPlayer ? 'white' : 'black')) {
                possibleMoves[i++] = { x: pos.x, y: pos.y, kill: pos };
            }
        });
    }
    // * ROOK * //
    if (pawn.moveType == 'rook') {
        // * down
        pos = [
            { x: pawn.x, y: pawn.y + 1 },
            { x: pawn.x, y: pawn.y + 2 },
            { x: pawn.x, y: pawn.y + 3 },
            { x: pawn.x, y: pawn.y + 4 },
            { x: pawn.x, y: pawn.y + 5 },
            { x: pawn.x, y: pawn.y + 6 },
            { x: pawn.x, y: pawn.y + 7 },
        ];

        for (j = 0; j < pos.length; j++) {
            if (
                check_if_pos_is_reachable(pos[j]) == 'empty' ||
                check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill'
            ) {
                pos[j].kill = null;
                if (check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill') {
                    pos[j].kill = grid[pos[j].y][pos[j].x];
                    possibleMoves[i++] = pos[j];
                    break;
                }
                possibleMoves[i++] = pos[j];
            } else {
                break;
            }
        }

        // * up
        pos = [
            { x: pawn.x, y: pawn.y - 1 },
            { x: pawn.x, y: pawn.y - 2 },
            { x: pawn.x, y: pawn.y - 3 },
            { x: pawn.x, y: pawn.y - 4 },
            { x: pawn.x, y: pawn.y - 5 },
            { x: pawn.x, y: pawn.y - 6 },
            { x: pawn.x, y: pawn.y - 7 },
        ];

        for (j = 0; j < pos.length; j++) {
            if (
                check_if_pos_is_reachable(pos[j]) == 'empty' ||
                check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill'
            ) {
                pos[j].kill = null;
                if (check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill') {
                    pos[j].kill = grid[pos[j].y][pos[j].x];
                    possibleMoves[i++] = pos[j];
                    break;
                }
                possibleMoves[i++] = pos[j];
            } else {
                break;
            }
        }

        // * right
        pos = [
            { x: pawn.x + 1, y: pawn.y },
            { x: pawn.x + 2, y: pawn.y },
            { x: pawn.x + 3, y: pawn.y },
            { x: pawn.x + 4, y: pawn.y },
            { x: pawn.x + 5, y: pawn.y },
            { x: pawn.x + 6, y: pawn.y },
            { x: pawn.x + 7, y: pawn.y },
        ];

        for (j = 0; j < pos.length; j++) {
            if (
                check_if_pos_is_reachable(pos[j]) == 'empty' ||
                check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill'
            ) {
                pos[j].kill = null;
                if (check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill') {
                    pos[j].kill = grid[pos[j].y][pos[j].x];
                    possibleMoves[i++] = pos[j];
                    break;
                }
                possibleMoves[i++] = pos[j];
            } else {
                break;
            }
        }

        // * left
        pos = [
            { x: pawn.x - 1, y: pawn.y },
            { x: pawn.x - 2, y: pawn.y },
            { x: pawn.x - 3, y: pawn.y },
            { x: pawn.x - 4, y: pawn.y },
            { x: pawn.x - 5, y: pawn.y },
            { x: pawn.x - 6, y: pawn.y },
            { x: pawn.x - 7, y: pawn.y },
        ];

        for (j = 0; j < pos.length; j++) {
            if (
                check_if_pos_is_reachable(pos[j]) == 'empty' ||
                check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill'
            ) {
                pos[j].kill = null;
                if (check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill') {
                    pos[j].kill = grid[pos[j].y][pos[j].x];
                    possibleMoves[i++] = pos[j];
                    break;
                }
                possibleMoves[i++] = pos[j];
            } else {
                break;
            }
        }
    }

    // * KNIGHT * //
    if (pawn.moveType == 'knight') {
        pos = [
            { x: pawn.x - 2, y: pawn.y - 1 },
            { x: pawn.x - 2, y: pawn.y + 1 },
            { x: pawn.x - 1, y: pawn.y - 2 },
            { x: pawn.x - 1, y: pawn.y + 2 },
            { x: pawn.x + 1, y: pawn.y - 2 },
            { x: pawn.x + 1, y: pawn.y + 2 },
            { x: pawn.x + 2, y: pawn.y - 1 },
            { x: pawn.x + 2, y: pawn.y + 1 },
        ];

        pos.forEach((pos) => {
            if (
                check_if_pos_is_reachable(pos) == 'empty' ||
                check_if_pos_is_reachable(pos) == 'has-pawn-to-kill'
            ) {
                pos.kill = null;
                if (check_if_pos_is_reachable(pos) == 'has-pawn-to-kill') {
                    pos.kill = grid[pos.y][pos.x];
                }
                possibleMoves[i++] = pos;
            }
        });
    }
    // * BISHOP * //
    if (pawn.moveType == 'bishop') {
        // * top left
        pos = [
            { x: pawn.x - 1, y: pawn.y - 1 },
            { x: pawn.x - 2, y: pawn.y - 2 },
            { x: pawn.x - 3, y: pawn.y - 3 },
            { x: pawn.x - 4, y: pawn.y - 4 },
            { x: pawn.x - 5, y: pawn.y - 5 },
            { x: pawn.x - 6, y: pawn.y - 6 },
            { x: pawn.x - 7, y: pawn.y - 7 },
        ];

        for (j = 0; j < pos.length; j++) {
            if (
                check_if_pos_is_reachable(pos[j]) == 'empty' ||
                check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill'
            ) {
                pos[j].kill = null;
                if (check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill') {
                    pos[j].kill = grid[pos[j].y][pos[j].x];
                    possibleMoves[i++] = pos[j];
                    break;
                }
                possibleMoves[i++] = pos[j];
            } else {
                break;
            }
        }

        // * top right
        pos = [
            { x: pawn.x + 1, y: pawn.y - 1 },
            { x: pawn.x + 2, y: pawn.y - 2 },
            { x: pawn.x + 3, y: pawn.y - 3 },
            { x: pawn.x + 4, y: pawn.y - 4 },
            { x: pawn.x + 5, y: pawn.y - 5 },
            { x: pawn.x + 6, y: pawn.y - 6 },
            { x: pawn.x + 7, y: pawn.y - 7 },
        ];

        for (j = 0; j < pos.length; j++) {
            if (
                check_if_pos_is_reachable(pos[j]) == 'empty' ||
                check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill'
            ) {
                pos[j].kill = null;
                if (check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill') {
                    pos[j].kill = grid[pos[j].y][pos[j].x];
                    possibleMoves[i++] = pos[j];
                    break;
                }
                possibleMoves[i++] = pos[j];
            } else {
                break;
            }
        }

        // * bottom left
        pos = [
            { x: pawn.x - 1, y: pawn.y + 1 },
            { x: pawn.x - 2, y: pawn.y + 2 },
            { x: pawn.x - 3, y: pawn.y + 3 },
            { x: pawn.x - 4, y: pawn.y + 4 },
            { x: pawn.x - 5, y: pawn.y + 5 },
            { x: pawn.x - 6, y: pawn.y + 6 },
            { x: pawn.x - 7, y: pawn.y + 7 },
        ];

        for (j = 0; j < pos.length; j++) {
            if (
                check_if_pos_is_reachable(pos[j]) == 'empty' ||
                check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill'
            ) {
                pos[j].kill = null;
                if (check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill') {
                    pos[j].kill = grid[pos[j].y][pos[j].x];
                    possibleMoves[i++] = pos[j];
                    break;
                }
                possibleMoves[i++] = pos[j];
            } else {
                break;
            }
        }

        // * bottom right
        pos = [
            { x: pawn.x + 1, y: pawn.y + 1 },
            { x: pawn.x + 2, y: pawn.y + 2 },
            { x: pawn.x + 3, y: pawn.y + 3 },
            { x: pawn.x + 4, y: pawn.y + 4 },
            { x: pawn.x + 5, y: pawn.y + 5 },
            { x: pawn.x + 6, y: pawn.y + 6 },
            { x: pawn.x + 7, y: pawn.y + 7 },
        ];

        for (j = 0; j < pos.length; j++) {
            if (
                check_if_pos_is_reachable(pos[j]) == 'empty' ||
                check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill'
            ) {
                pos[j].kill = null;
                if (check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill') {
                    pos[j].kill = grid[pos[j].y][pos[j].x];
                    possibleMoves[i++] = pos[j];
                    break;
                }
                possibleMoves[i++] = pos[j];
            } else {
                break;
            }
        }
    }

    // * QUEEN * //
    if (pawn.moveType == 'queen') {
        // * down
        pos = [
            { x: pawn.x, y: pawn.y + 1 },
            { x: pawn.x, y: pawn.y + 2 },
            { x: pawn.x, y: pawn.y + 3 },
            { x: pawn.x, y: pawn.y + 4 },
            { x: pawn.x, y: pawn.y + 5 },
            { x: pawn.x, y: pawn.y + 6 },
            { x: pawn.x, y: pawn.y + 7 },
        ];

        for (j = 0; j < pos.length; j++) {
            if (
                check_if_pos_is_reachable(pos[j]) == 'empty' ||
                check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill'
            ) {
                pos[j].kill = null;
                if (check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill') {
                    pos[j].kill = grid[pos[j].y][pos[j].x];
                    possibleMoves[i++] = pos[j];
                    break;
                }
                possibleMoves[i++] = pos[j];
            } else {
                break;
            }
        }

        // * up
        pos = [
            { x: pawn.x, y: pawn.y - 1 },
            { x: pawn.x, y: pawn.y - 2 },
            { x: pawn.x, y: pawn.y - 3 },
            { x: pawn.x, y: pawn.y - 4 },
            { x: pawn.x, y: pawn.y - 5 },
            { x: pawn.x, y: pawn.y - 6 },
            { x: pawn.x, y: pawn.y - 7 },
        ];

        for (j = 0; j < pos.length; j++) {
            if (
                check_if_pos_is_reachable(pos[j]) == 'empty' ||
                check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill'
            ) {
                pos[j].kill = null;
                if (check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill') {
                    pos[j].kill = grid[pos[j].y][pos[j].x];
                    possibleMoves[i++] = pos[j];
                    break;
                }
                possibleMoves[i++] = pos[j];
            } else {
                break;
            }
        }

        // * right
        pos = [
            { x: pawn.x + 1, y: pawn.y },
            { x: pawn.x + 2, y: pawn.y },
            { x: pawn.x + 3, y: pawn.y },
            { x: pawn.x + 4, y: pawn.y },
            { x: pawn.x + 5, y: pawn.y },
            { x: pawn.x + 6, y: pawn.y },
            { x: pawn.x + 7, y: pawn.y },
        ];

        for (j = 0; j < pos.length; j++) {
            if (
                check_if_pos_is_reachable(pos[j]) == 'empty' ||
                check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill'
            ) {
                pos[j].kill = null;
                if (check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill') {
                    pos[j].kill = grid[pos[j].y][pos[j].x];
                    possibleMoves[i++] = pos[j];
                    break;
                }
                possibleMoves[i++] = pos[j];
            } else {
                break;
            }
        }

        // * left
        pos = [
            { x: pawn.x - 1, y: pawn.y },
            { x: pawn.x - 2, y: pawn.y },
            { x: pawn.x - 3, y: pawn.y },
            { x: pawn.x - 4, y: pawn.y },
            { x: pawn.x - 5, y: pawn.y },
            { x: pawn.x - 6, y: pawn.y },
            { x: pawn.x - 7, y: pawn.y },
        ];

        for (j = 0; j < pos.length; j++) {
            if (
                check_if_pos_is_reachable(pos[j]) == 'empty' ||
                check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill'
            ) {
                pos[j].kill = null;
                if (check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill') {
                    pos[j].kill = grid[pos[j].y][pos[j].x];
                    possibleMoves[i++] = pos[j];
                    break;
                }
                possibleMoves[i++] = pos[j];
            } else {
                break;
            }
        }

        // * top left
        pos = [
            { x: pawn.x - 1, y: pawn.y - 1 },
            { x: pawn.x - 2, y: pawn.y - 2 },
            { x: pawn.x - 3, y: pawn.y - 3 },
            { x: pawn.x - 4, y: pawn.y - 4 },
            { x: pawn.x - 5, y: pawn.y - 5 },
            { x: pawn.x - 6, y: pawn.y - 6 },
            { x: pawn.x - 7, y: pawn.y - 7 },
        ];

        for (j = 0; j < pos.length; j++) {
            if (
                check_if_pos_is_reachable(pos[j]) == 'empty' ||
                check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill'
            ) {
                pos[j].kill = null;
                if (check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill') {
                    pos[j].kill = grid[pos[j].y][pos[j].x];
                    possibleMoves[i++] = pos[j];
                    break;
                }
                possibleMoves[i++] = pos[j];
            } else {
                break;
            }
        }

        // * top right
        pos = [
            { x: pawn.x + 1, y: pawn.y - 1 },
            { x: pawn.x + 2, y: pawn.y - 2 },
            { x: pawn.x + 3, y: pawn.y - 3 },
            { x: pawn.x + 4, y: pawn.y - 4 },
            { x: pawn.x + 5, y: pawn.y - 5 },
            { x: pawn.x + 6, y: pawn.y - 6 },
            { x: pawn.x + 7, y: pawn.y - 7 },
        ];

        for (j = 0; j < pos.length; j++) {
            if (
                check_if_pos_is_reachable(pos[j]) == 'empty' ||
                check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill'
            ) {
                pos[j].kill = null;
                if (check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill') {
                    pos[j].kill = grid[pos[j].y][pos[j].x];
                    possibleMoves[i++] = pos[j];
                    break;
                }
                possibleMoves[i++] = pos[j];
            } else {
                break;
            }
        }

        // * bottom left
        pos = [
            { x: pawn.x - 1, y: pawn.y + 1 },
            { x: pawn.x - 2, y: pawn.y + 2 },
            { x: pawn.x - 3, y: pawn.y + 3 },
            { x: pawn.x - 4, y: pawn.y + 4 },
            { x: pawn.x - 5, y: pawn.y + 5 },
            { x: pawn.x - 6, y: pawn.y + 6 },
            { x: pawn.x - 7, y: pawn.y + 7 },
        ];

        for (j = 0; j < pos.length; j++) {
            if (
                check_if_pos_is_reachable(pos[j]) == 'empty' ||
                check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill'
            ) {
                pos[j].kill = null;
                if (check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill') {
                    pos[j].kill = grid[pos[j].y][pos[j].x];
                    possibleMoves[i++] = pos[j];
                    break;
                }
                possibleMoves[i++] = pos[j];
            } else {
                break;
            }
        }

        // * bottom right
        pos = [
            { x: pawn.x + 1, y: pawn.y + 1 },
            { x: pawn.x + 2, y: pawn.y + 2 },
            { x: pawn.x + 3, y: pawn.y + 3 },
            { x: pawn.x + 4, y: pawn.y + 4 },
            { x: pawn.x + 5, y: pawn.y + 5 },
            { x: pawn.x + 6, y: pawn.y + 6 },
            { x: pawn.x + 7, y: pawn.y + 7 },
        ];

        for (j = 0; j < pos.length; j++) {
            if (
                check_if_pos_is_reachable(pos[j]) == 'empty' ||
                check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill'
            ) {
                pos[j].kill = null;
                if (check_if_pos_is_reachable(pos[j]) == 'has-pawn-to-kill') {
                    pos[j].kill = grid[pos[j].y][pos[j].x];
                    possibleMoves[i++] = pos[j];
                    break;
                }
                possibleMoves[i++] = pos[j];
            } else {
                break;
            }
        }
    }

    // * KING * //
    if (pawn.moveType == 'king') {
        pos = [
            { x: pawn.x - 1, y: pawn.y - 1 },
            { x: pawn.x - 1, y: pawn.y },
            { x: pawn.x - 1, y: pawn.y + 1 },
            { x: pawn.x, y: pawn.y - 1 },
            { x: pawn.x, y: pawn.y + 1 },
            { x: pawn.x + 1, y: pawn.y - 1 },
            { x: pawn.x + 1, y: pawn.y },
            { x: pawn.x + 1, y: pawn.y + 1 },
        ];

        pos.forEach((pos) => {
            if (
                check_if_pos_is_reachable(pos) == 'empty' ||
                check_if_pos_is_reachable(pos) == 'has-pawn-to-kill'
            ) {
                pos.kill = null;
                if (check_if_pos_is_reachable(pos) == 'has-pawn-to-kill') {
                    pos.kill = grid[pos.y][pos.x];
                }
                possibleMoves[i++] = pos;
            }
        });

        // Check roque
        if (pawn.first_move) {
            // White
            if (currentPlayer === 0) {
                // White Right Rook (5-7 && 6-7)
                if (Pawns[0][1][1].first_move) {
                    if (
                        check_if_pos_is_reachable({ x: 5, y: 7 }) === 'empty' &&
                        check_if_pos_is_reachable({ x: 6, y: 7 }) === 'empty'
                    ) {
                        possibleMoves[i++] = { x: 6, y: 7, roque: 3 };
                    }
                }

                // White Left Rook (1-7 && 2-7 && 3-7)
                if (Pawns[0][1][0].first_move) {
                    if (
                        check_if_pos_is_reachable({ x: 1, y: 7 }) === 'empty' &&
                        check_if_pos_is_reachable({ x: 2, y: 7 }) === 'empty' &&
                        check_if_pos_is_reachable({ x: 3, y: 7 }) === 'empty'
                    ) {
                        possibleMoves[i++] = { x: 2, y: 7, roque: 2 };
                    }
                }
            }
            // Black
            else {
                // Black Right Rook (1-0 && 2-0 && 3-0)
                if (Pawns[1][1][1].first_move) {
                    if (
                        check_if_pos_is_reachable({ x: 1, y: 0 }) === 'empty' &&
                        check_if_pos_is_reachable({ x: 2, y: 0 }) === 'empty' &&
                        check_if_pos_is_reachable({ x: 3, y: 0 }) === 'empty'
                    ) {
                        possibleMoves[i++] = { x: 2, y: 0, roque: 0 };
                    }
                }

                // Black Left Rook (5-0 && 6-0)
                if (Pawns[1][1][1].first_move) {
                    if (
                        check_if_pos_is_reachable({ x: 5, y: 0 }) === 'empty' &&
                        check_if_pos_is_reachable({ x: 6, y: 0 }) === 'empty'
                    ) {
                        possibleMoves[i++] = { x: 6, y: 0, roque: 1 };
                    }
                }
            }
        }
    }
    return possibleMoves;
}

function check_if_pos_is_reachable(pos) {
    if (pos.y < 0 || pos.y > 7 || pos.x < 0 || pos.x > 7) {
        return 'out-of-board';
    }
    if (grid[pos.y][pos.x] == null) {
        return 'empty';
    } else {
        if (grid[pos.y][pos.x].color == (isBlackPlayer ? 'black' : 'white')) {
            return 'has-friendly-pawn';
        } else {
            return 'has-pawn-to-kill';
        }
    }
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
        playerToKill = isBlackPlayer ? 0 : 1;
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
    if (pawnToMove.moveType === 'pawn' && moveToDo.y == (isBlackPlayer ? 7 : 0)) {
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
