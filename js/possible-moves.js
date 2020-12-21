function calculate_possible_moves(pawn) {
    let possibleMoves = [];

    switch (pawn.moveType) {
        case 'pawn':
            possibleMoves = pawn_logic(pawn);
            break;

        case 'rook':
            possibleMoves = rook_logic(pawn);
            break;

        case 'knight':
            possibleMoves = knight_logic(pawn);
            break;

        case 'bishop':
            possibleMoves = bishop_logic(pawn);
            break;

        case 'queen':
            possibleMoves = queen_logic(pawn);
            break;

        case 'king':
            possibleMoves = king_logic(pawn);
            break;

        default:
            console.error('Swicth error', pawn);
    }

    return possibleMoves;
}

// Calculate if it's possible move
function is_possible_moves(pos) {
    const possibleMoves = [];

    pos.forEach((pos) => {
        for (j = 0; j < pos.length; j++) {
            if (
                check_if_pos_is_reachable(pos[j]) === 'empty' ||
                check_if_pos_is_reachable(pos[j]) === 'has-pawn-to-kill'
            ) {
                if (check_if_pos_is_reachable(pos[j]) === 'has-pawn-to-kill') {
                    possibleMoves.push({ ...pos[j], kill: grid[pos[j].y][pos[j].x] });
                    break;
                }
                possibleMoves.push({ ...pos[j], kill: null });
            } else {
                break;
            }
        }
    });

    return possibleMoves;
}

// Check what is on a position
function check_if_pos_is_reachable(pos) {
    if (pos.y < 0 || pos.y > 7 || pos.x < 0 || pos.x > 7) {
        return 'out-of-board';
    }
    if (grid[pos.y][pos.x] === null) {
        return 'empty';
    } else {
        if (grid[pos.y][pos.x].color === (currentPlayer ? 'black' : 'white')) {
            return 'has-friendly-pawn';
        } else {
            return 'has-pawn-to-kill';
        }
    }
}

// All pawn logic
function pawn_logic(pawn) {
    const possibleMoves = [];

    // Pawn at any pos
    pos = { x: pawn.x, y: currentPlayer ? pawn.y + 1 : pawn.y - 1 };

    if (check_if_pos_is_reachable(pos) === 'empty') {
        possibleMoves.push({ ...pos, kill: null });

        // Pawn at start pos
        if (pawn.y == (currentPlayer ? 1 : 6)) {
            pos = { x: pawn.x, y: currentPlayer ? pawn.y + 2 : pawn.y - 2 };
            if (check_if_pos_is_reachable(pos) === 'empty') {
                possibleMoves.push({ ...pos, kill: null });
            }
        }
    }

    // Check if pawn can do a kill
    pos = [
        { x: pawn.x + 1, y: currentPlayer ? pawn.y + 1 : pawn.y - 1 },
        { x: pawn.x - 1, y: currentPlayer ? pawn.y + 1 : pawn.y - 1 },
    ];

    pos.forEach((pos) => {
        if (check_if_pos_is_reachable(pos) === 'has-pawn-to-kill') {
            possibleMoves.push({ ...pos, kill: grid[pos.y][pos.x] });
        }
    });

    return possibleMoves;
}

function rook_logic(pawn) {
    pos = [
        [
            // Down
            { x: pawn.x, y: pawn.y + 1 },
            { x: pawn.x, y: pawn.y + 2 },
            { x: pawn.x, y: pawn.y + 3 },
            { x: pawn.x, y: pawn.y + 4 },
            { x: pawn.x, y: pawn.y + 5 },
            { x: pawn.x, y: pawn.y + 6 },
            { x: pawn.x, y: pawn.y + 7 },
        ],
        [
            // Up
            { x: pawn.x, y: pawn.y - 1 },
            { x: pawn.x, y: pawn.y - 2 },
            { x: pawn.x, y: pawn.y - 3 },
            { x: pawn.x, y: pawn.y - 4 },
            { x: pawn.x, y: pawn.y - 5 },
            { x: pawn.x, y: pawn.y - 6 },
            { x: pawn.x, y: pawn.y - 7 },
        ],
        [
            // Right
            { x: pawn.x + 1, y: pawn.y },
            { x: pawn.x + 2, y: pawn.y },
            { x: pawn.x + 3, y: pawn.y },
            { x: pawn.x + 4, y: pawn.y },
            { x: pawn.x + 5, y: pawn.y },
            { x: pawn.x + 6, y: pawn.y },
            { x: pawn.x + 7, y: pawn.y },
        ],
        [
            // Left
            { x: pawn.x - 1, y: pawn.y },
            { x: pawn.x - 2, y: pawn.y },
            { x: pawn.x - 3, y: pawn.y },
            { x: pawn.x - 4, y: pawn.y },
            { x: pawn.x - 5, y: pawn.y },
            { x: pawn.x - 6, y: pawn.y },
            { x: pawn.x - 7, y: pawn.y },
        ],
    ];

    return is_possible_moves(pos);
}

function knight_logic(pawn) {
    pos = [
        [{ x: pawn.x - 2, y: pawn.y - 1 }],
        [{ x: pawn.x - 2, y: pawn.y + 1 }],
        [{ x: pawn.x - 1, y: pawn.y - 2 }],
        [{ x: pawn.x - 1, y: pawn.y + 2 }],
        [{ x: pawn.x + 1, y: pawn.y - 2 }],
        [{ x: pawn.x + 1, y: pawn.y + 2 }],
        [{ x: pawn.x + 2, y: pawn.y - 1 }],
        [{ x: pawn.x + 2, y: pawn.y + 1 }],
    ];

    return is_possible_moves(pos);
}

function bishop_logic(pawn) {
    pos = [
        [
            // Top Left
            { x: pawn.x - 1, y: pawn.y - 1 },
            { x: pawn.x - 2, y: pawn.y - 2 },
            { x: pawn.x - 3, y: pawn.y - 3 },
            { x: pawn.x - 4, y: pawn.y - 4 },
            { x: pawn.x - 5, y: pawn.y - 5 },
            { x: pawn.x - 6, y: pawn.y - 6 },
            { x: pawn.x - 7, y: pawn.y - 7 },
        ],
        [
            // Top Right
            { x: pawn.x + 1, y: pawn.y - 1 },
            { x: pawn.x + 2, y: pawn.y - 2 },
            { x: pawn.x + 3, y: pawn.y - 3 },
            { x: pawn.x + 4, y: pawn.y - 4 },
            { x: pawn.x + 5, y: pawn.y - 5 },
            { x: pawn.x + 6, y: pawn.y - 6 },
            { x: pawn.x + 7, y: pawn.y - 7 },
        ],
        [
            // Bottom Left
            { x: pawn.x - 1, y: pawn.y + 1 },
            { x: pawn.x - 2, y: pawn.y + 2 },
            { x: pawn.x - 3, y: pawn.y + 3 },
            { x: pawn.x - 4, y: pawn.y + 4 },
            { x: pawn.x - 5, y: pawn.y + 5 },
            { x: pawn.x - 6, y: pawn.y + 6 },
            { x: pawn.x - 7, y: pawn.y + 7 },
        ],
        [
            // Bottom Right
            { x: pawn.x + 1, y: pawn.y + 1 },
            { x: pawn.x + 2, y: pawn.y + 2 },
            { x: pawn.x + 3, y: pawn.y + 3 },
            { x: pawn.x + 4, y: pawn.y + 4 },
            { x: pawn.x + 5, y: pawn.y + 5 },
            { x: pawn.x + 6, y: pawn.y + 6 },
            { x: pawn.x + 7, y: pawn.y + 7 },
        ],
    ];

    return is_possible_moves(pos);
}

function queen_logic(pawn) {
    return rook_logic(pawn).concat(bishop_logic(pawn));
}

function king_logic(pawn) {
    pos = [
        [{ x: pawn.x - 1, y: pawn.y - 1 }],
        [{ x: pawn.x - 1, y: pawn.y }],
        [{ x: pawn.x - 1, y: pawn.y + 1 }],
        [{ x: pawn.x, y: pawn.y - 1 }],
        [{ x: pawn.x, y: pawn.y + 1 }],
        [{ x: pawn.x + 1, y: pawn.y - 1 }],
        [{ x: pawn.x + 1, y: pawn.y }],
        [{ x: pawn.x + 1, y: pawn.y + 1 }],
    ];

    possibleMoves = is_possible_moves(pos);

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
                    possibleMoves.push({ x: 6, y: 7, roque: 3 });
                }
            }

            // White Left Rook (1-7 && 2-7 && 3-7)
            if (Pawns[0][1][0].first_move) {
                if (
                    check_if_pos_is_reachable({ x: 1, y: 7 }) === 'empty' &&
                    check_if_pos_is_reachable({ x: 2, y: 7 }) === 'empty' &&
                    check_if_pos_is_reachable({ x: 3, y: 7 }) === 'empty'
                ) {
                    possibleMoves.push({ x: 2, y: 7, roque: 2 });
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
                    possibleMoves.push({ x: 2, y: 0, roque: 0 });
                }
            }

            // Black Left Rook (5-0 && 6-0)
            if (Pawns[1][1][1].first_move) {
                if (
                    check_if_pos_is_reachable({ x: 5, y: 0 }) === 'empty' &&
                    check_if_pos_is_reachable({ x: 6, y: 0 }) === 'empty'
                ) {
                    possibleMoves.push({ x: 6, y: 0, roque: 1 });
                }
            }
        }
    }

    return possibleMoves;
}
