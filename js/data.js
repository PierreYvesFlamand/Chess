var isBlackPlayer = 0;
var currentPlayer = 0;

var Pawns = [
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

var grid = [
    [Pawns[1][1][0], Pawns[1][2][0], Pawns[1][3][0], Pawns[1][4][0], Pawns[1][5][0], Pawns[1][3][1], Pawns[1][2][1], Pawns[1][1][1]],
    [Pawns[1][0][0], Pawns[1][0][1], Pawns[1][0][2], Pawns[1][0][3], Pawns[1][0][4], Pawns[1][0][5], Pawns[1][0][6], Pawns[1][0][7]],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [Pawns[0][0][0], Pawns[0][0][1], Pawns[0][0][2], Pawns[0][0][3], Pawns[0][0][4], Pawns[0][0][5], Pawns[0][0][6], Pawns[0][0][7]],
    [Pawns[0][1][0], Pawns[0][2][0], Pawns[0][3][0], Pawns[0][4][0], Pawns[0][5][0], Pawns[0][3][1], Pawns[0][2][1], Pawns[0][1][1]],
];
