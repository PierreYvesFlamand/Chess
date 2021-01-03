let currentPlayer = 0;

const Pawns = [
    (white = [
        (pawn = [
            {
                id: 'pawn-w-0',
                color: 'white',
                moveType: 'pawn',
                x: 0,
                y: 6,
            },
            {
                id: 'pawn-w-1',
                color: 'white',
                moveType: 'pawn',
                x: 1,
                y: 6,
            },
            {
                id: 'pawn-w-2',
                color: 'white',
                moveType: 'pawn',
                x: 2,
                y: 6,
            },
            {
                id: 'pawn-w-3',
                color: 'white',
                moveType: 'pawn',
                x: 3,
                y: 6,
            },
            {
                id: 'pawn-w-4',
                color: 'white',
                moveType: 'pawn',
                x: 4,
                y: 6,
            },
            {
                id: 'pawn-w-5',
                color: 'white',
                moveType: 'pawn',
                x: 5,
                y: 6,
            },
            {
                id: 'pawn-w-6',
                color: 'white',
                moveType: 'pawn',
                x: 6,
                y: 6,
            },
            {
                id: 'pawn-w-7',
                color: 'white',
                moveType: 'pawn',
                x: 7,
                y: 6,
            },
        ]),
        (rook = [
            {
                id: 'rook-w-0',
                color: 'white',
                moveType: 'rook',
                x: 0,
                y: 7,
                first_move: true,
            },
            {
                id: 'rook-w-1',
                color: 'white',
                moveType: 'rook',
                x: 7,
                y: 7,
                first_move: true,
            },
        ]),
        (knight = [
            {
                id: 'knight-w-0',
                color: 'white',
                moveType: 'knight',
                x: 1,
                y: 7,
            },
            {
                id: 'knight-w-1',
                color: 'white',
                moveType: 'knight',
                x: 6,
                y: 7,
            },
        ]),
        (bishop = [
            {
                id: 'bishop-w-0',
                color: 'white',
                moveType: 'bishop',
                x: 2,
                y: 7,
            },
            {
                id: 'bishop-w-1',
                color: 'white',
                moveType: 'bishop',
                x: 5,
                y: 7,
            },
        ]),
        (queen = [
            {
                id: 'queen-w',
                color: 'white',
                moveType: 'queen',
                x: 3,
                y: 7,
            },
        ]),
        (king = [
            {
                id: 'king-w',
                color: 'white',
                moveType: 'king',
                x: 4,
                y: 7,
                first_move: true,
            },
        ]),
    ]),
    (black = [
        (pawn = [
            {
                id: 'pawn-b-0',
                color: 'black',
                moveType: 'pawn',
                x: 0,
                y: 1,
            },
            {
                id: 'pawn-b-1',
                color: 'black',
                moveType: 'pawn',
                x: 1,
                y: 1,
            },
            {
                id: 'pawn-b-2',
                color: 'black',
                moveType: 'pawn',
                x: 2,
                y: 1,
            },
            {
                id: 'pawn-b-3',
                color: 'black',
                moveType: 'pawn',
                x: 3,
                y: 1,
            },
            {
                id: 'pawn-b-4',
                color: 'black',
                moveType: 'pawn',
                x: 4,
                y: 1,
            },
            {
                id: 'pawn-b-5',
                color: 'black',
                moveType: 'pawn',
                x: 5,
                y: 1,
            },
            {
                id: 'pawn-b-6',
                color: 'black',
                moveType: 'pawn',
                x: 6,
                y: 1,
            },
            {
                id: 'pawn-b-7',
                color: 'black',
                moveType: 'pawn',
                x: 7,
                y: 1,
            },
        ]),
        (rook = [
            {
                id: 'rook-b-0',
                color: 'black',
                moveType: 'rook',
                x: 0,
                y: 0,
                first_move: true,
            },
            {
                id: 'rook-b-1',
                color: 'black',
                moveType: 'rook',
                x: 7,
                y: 0,
                first_move: true,
            },
        ]),
        (knight = [
            {
                id: 'knight-b-0',
                color: 'black',
                moveType: 'knight',
                x: 1,
                y: 0,
            },
            {
                id: 'knight-b-1',
                color: 'black',
                moveType: 'knight',
                x: 6,
                y: 0,
            },
        ]),
        (bishop = [
            {
                id: 'bishop-b-0',
                color: 'black',
                moveType: 'bishop',
                x: 2,
                y: 0,
            },
            {
                id: 'bishop-b-1',
                color: 'black',
                moveType: 'bishop',
                x: 5,
                y: 0,
            },
        ]),
        (queen = [
            {
                id: 'queen-b',
                color: 'black',
                moveType: 'queen',
                x: 3,
                y: 0,
            },
        ]),
        (king = [
            {
                id: 'king-b',
                color: 'black',
                moveType: 'king',
                x: 4,
                y: 0,
                first_move: true,
            },
        ]),
    ]),
];

const grid = [
    [
        Pawns[1][1][0],
        Pawns[1][2][0],
        Pawns[1][3][0],
        Pawns[1][4][0],
        Pawns[1][5][0],
        Pawns[1][3][1],
        Pawns[1][2][1],
        Pawns[1][1][1],
    ],
    [
        Pawns[1][0][0],
        Pawns[1][0][1],
        Pawns[1][0][2],
        Pawns[1][0][3],
        Pawns[1][0][4],
        Pawns[1][0][5],
        Pawns[1][0][6],
        Pawns[1][0][7],
    ],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [
        Pawns[0][0][0],
        Pawns[0][0][1],
        Pawns[0][0][2],
        Pawns[0][0][3],
        Pawns[0][0][4],
        Pawns[0][0][5],
        Pawns[0][0][6],
        Pawns[0][0][7],
    ],
    [
        Pawns[0][1][0],
        Pawns[0][2][0],
        Pawns[0][3][0],
        Pawns[0][4][0],
        Pawns[0][5][0],
        Pawns[0][3][1],
        Pawns[0][2][1],
        Pawns[0][1][1],
    ],
];

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

    // Check Castle
    if (pawn.first_move) {
        // White
        if (currentPlayer === 0) {
            // White Right Rook (5-7 && 6-7)
            if (Pawns[0][1][1].first_move) {
                if (
                    check_if_pos_is_reachable({ x: 5, y: 7 }) === 'empty' &&
                    check_if_pos_is_reachable({ x: 6, y: 7 }) === 'empty'
                ) {
                    possibleMoves.push({ x: 6, y: 7, castle: 3 });
                }
            }

            // White Left Rook (1-7 && 2-7 && 3-7)
            if (Pawns[0][1][0].first_move) {
                if (
                    check_if_pos_is_reachable({ x: 1, y: 7 }) === 'empty' &&
                    check_if_pos_is_reachable({ x: 2, y: 7 }) === 'empty' &&
                    check_if_pos_is_reachable({ x: 3, y: 7 }) === 'empty'
                ) {
                    possibleMoves.push({ x: 2, y: 7, castle: 2 });
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
                    possibleMoves.push({ x: 2, y: 0, castle: 0 });
                }
            }

            // Black Left Rook (5-0 && 6-0)
            if (Pawns[1][1][1].first_move) {
                if (
                    check_if_pos_is_reachable({ x: 5, y: 0 }) === 'empty' &&
                    check_if_pos_is_reachable({ x: 6, y: 0 }) === 'empty'
                ) {
                    possibleMoves.push({ x: 6, y: 0, castle: 1 });
                }
            }
        }
    }

    return possibleMoves;
}

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
            toggleModal({ modal: 'end', winner: 'Black' });
        }

        if (moveToDo.kill.id == 'king-b') {
            toggleModal({ modal: 'end', winner: 'White' });
        }
    }

    // Promote Pawn if needed
    if (pawnToMove.moveType === 'pawn' && moveToDo.y == (currentPlayer ? 7 : 0)) {
        toggleModal({ modal: 'promotion', pawnToPromote: pawnToMove });
    }

    // Castling if needed
    if (moveToDo.castle !== undefined) {
        let castle_move = {};

        switch (moveToDo.castle) {
            case 0:
                castle_move.i = 1;
                castle_move.j = 1;
                castle_move.k = 0;

                castle_move.x = 0;
                castle_move.y = 0;

                castle_move.x_to_do = 3;
                castle_move.y_to_do = 0;
                break;

            case 1:
                castle_move.i = 1;
                castle_move.j = 1;
                castle_move.k = 1;

                castle_move.x = 7;
                castle_move.y = 0;

                castle_move.x_to_do = 5;
                castle_move.y_to_do = 0;
                break;

            case 2:
                castle_move.i = 0;
                castle_move.j = 1;
                castle_move.k = 0;

                castle_move.x = 0;
                castle_move.y = 7;

                castle_move.x_to_do = 3;
                castle_move.y_to_do = 7;
                break;

            case 3:
                castle_move.i = 0;
                castle_move.j = 1;
                castle_move.k = 1;

                castle_move.x = 7;
                castle_move.y = 7;

                castle_move.x_to_do = 5;
                castle_move.y_to_do = 7;
                break;

            default:
                console.error('Switch error');
                break;
        }

        Pawns[castle_move.i][castle_move.j][castle_move.k].first_move = false;
        grid[castle_move.y][castle_move.x] = null;
        grid[castle_move.y_to_do][castle_move.x_to_do] = Pawns[castle_move.i][castle_move.j][castle_move.k];

        Pawns[castle_move.i][castle_move.j][castle_move.k].x = castle_move.x_to_do;
        Pawns[castle_move.i][castle_move.j][castle_move.k].y = castle_move.y_to_do;

        document.getElementById(Pawns[castle_move.i][castle_move.j][castle_move.k].id).style.gridArea =
            get_letter(castle_move.y_to_do) + (castle_move.x_to_do + 1);
    }

    // Next turn
    next_turn();
}

function get_letter(value) {
    var letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    return letter[value];
}

function pawn_promotion(pawnToPromote, type) {
    const promotPlayer = currentPlayer ? 0 : 1;
    document.getElementById(pawnToPromote.id).innerHTML = '<i class="fas fa-chess-' + type + '"></i>';

    for (let i = 0; i < Pawns[promotPlayer][0].length; i++) {
        const pawn = Pawns[promotPlayer][0][i];

        if (pawn.id === pawnToPromote.id) {
            pawn.moveType = type;

            // Sneak break because promotion id done
            i = Pawns[promotPlayer][0].length;
            break;
        }
    }
}
