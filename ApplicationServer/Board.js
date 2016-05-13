var PieceEnum = {
	King: 0,
	Queen: 1,
	Rook: 2,
	Bishop: 3,
	Knight: 4,
	Pawn: 5
};

module.exports.PieceEnum = PieceEnum;

var ColorEnum = {
	Black: 0,
	White: -1
};

module.exports.ColorEnum = ColorEnum;

var PieceImgMap = {
	"00": "&#9819;", // black king
	"01": "&#9813;", // white king
	"10": "&#9818;", // black queen 
	"11": "&#9812;", // white queen 
	"20": "&#9820;", // rook black
	"21": "&#9814;", // rook white
	"30": "&#9821;", // bishop black
	"31": "&#9815;", // bishop white
	"40": "&#9822;", // knight black
	"41": "&#9816;", // knight white
	"50": "&#9823;", // pawn black
	"51": "&#9817;", // pawn white
};

module.exports.PieceImgMap = PieceImgMap;

function Piece(x,y,type,color,img) {
	this.x = x;
	this.y = y;
	this.Type = type;
	this.Color = color;
	this.Img = img;
	this.MoveCount = 0;

}

Piece.prototype  = {
	x: undefined,
	y: undefined,
	Type: undefined,
	Color: undefined,
	Img: undefined,
	MoveCount: undefined,
	CanMove: function(PrevX, PrevY, CurrX, CurrY, board) {

		var CheckColorOrEmpty = (board[CurrX][CurrY] == undefined || board[CurrX][CurrY].Color == ~this.Color) );

		if( ( PrevX > -1 || PrevX <= 7 ) && ( PrevY > -1 || PrevY <= 7 ) ) {

			return ( board[PrevX][PrevY] == undefined || ( PrevX == this.x && PrevY == this.y ) ) && CheckColorOrEmpty;
		}

		return CheckColorOrEmpty;
	},
	GetHorizontal: function(x, y, board) {

		var moves = [];

		for(var i = 0; i < x; i++) {

			if(CanMove(i -1, y, i,y,board))
				moves.push({ x: i, y: y });
		}

		for(var i = x + 1; i < 8; i++) {

			if(CanMove(i - 1, y, i,y,board))
				moves.push({ x: i, y: y });	
		}

		return moves;

	},
	GetVertical: function(x, y, board) {

		var moves = [];

		for(var i = 0; i < y; i++) {
			if(CanMove(x, i - 1, x,i,board))
				moves.push({ x: x, y: i });
			else break;
		}

		for(var i = y + 1; i <= 7; i++) {
			if(CanMove(x, i - 1, x,i,board))
				moves.push({ x: x, y: i });
			else break;
		}

		return moves;
	},
	GetDiagonal: function(x, y, board) {
		var moves = [];

		// above x-axis - bottom to top diagonal
		for(var i = x + 1, j = y + 1; i <= 7 && j <= 7; i++, j++) {

			if(CanMove(i - 1, j - 1, i, j, board))
				moves.push({ x: i, y: j });
			else  break;
		}

		//below x-axis - bottom to top diagonal
		for(var i = x - 1, j = y - 1; i >= 0 && j >= 0; i++, j++) {

			if(CanMove(i - 1, j - 1, i, j, board))
				moves.push({ x: i, y: j });
			else break;
		}

		//above x-axis - top to bottom diagonal
		for(var i = x - 1, j = y + 1; i >= 0 && j <= 7; i++, j++) {

			if(CanMove(i - 1, j - 1, i, j, board))
				moves.push({ x: i, y: j });
			else break;
		}

		//below x-axis - top to bottom diagonal
		for(var i = x + 1, j = y - 1; i <= 7 && j >= 0; i++, j++) {
			
			if(CanMove(i - 1, j - 1, i, j, board))
				moves.push({ x: i, y: j });
			else break;
		}

		return moves;
	},
	MoveSet: {
		0: function(x, y, board) { // king

			var moves = [];

			if(x - 1 > -1)
				moves.push({ x: x - 1, y: y });
			if(x + 1 <= 7)
				moves.push({ x: x + 1, y: y });
			if(y + 1 <= 7)
				moves.push({ x: x, y: y + 1 });
			if(y - 1 > -1)
				moves.push({ x: x, y: y - 1 });
			if(y + 1 <= 7 && x + 1 <= 7)
				moves.push({ x: x + 1, y: y + 1 });
			if(x - 1 > -1 && y - 1 > -1)
				moves.push({ x: x - 1, y: y - 1 });
			if(x + 1 <= 7 && y - 1 > -1)
				moves.push({ x: x + 1, y: y - 1 });
			if(x - 1 > -1 && y + 1 <= 7)
				moves.push({ x: x - 1, y: y + 1 });

			return moves;
		},

		1: function(x, y, board) { // queen

			var moves = [];

			moves = GetDiagonal(x, y, board);

			moves = moves.concat(GetHorizontal(x, y, board));

			moves = moves.concat(GetVertical(x, y, board));

		},

		2: function(x, y, board) { // rook

			var moves = [];

			moves = GetVertical(x, y, board);
			moves = moves.concat(GetHorizontal(x, y, board));

			return moves;

		},

		3: function(x, y, board) { // bishop

			return GetDiagonal(x, y, board);

		},

		4: function(x, y, board) { // knight
			var moves = [];

			if(y + 2 <= 7 && x + 1 <= 7 && CanMove(8, 8, x + 1, y + 2, board))
				moves.push({ x: x +1, y: y +2 });
			if(y + 2 <= 7 && x - 1 >= 0 && CanMove(8, 8, x - 1, y + 2, board))
				moves.push({ x: x - 1, y: y + 2 });
			if(x - 2 >= 0 && y - 1 >= 0 && CanMove(8, 8, x - 2, y - 1, board))
				moves.push({ x: x -2, y: y - 1 });
			if(x + 2 <= 7 && y - 1 >= 0 && CanMove(8, 8,x + 2, y - 1, board))
				moves.push({ x: x + 2, y: y -1});
			if(x - 1 >= 0 && y - 2 >= 0 && CanMove(8, 8, x - 1, y - 2, board))
				moves.push({ x: x - 1, y: y - 2 });
			if(x + 1 <= 7 && y - 2 >= 0 && CanMove(8, 8, x + 1, y - 2, board))
				moves.push({ x: x + 1, y: y - 2 });

			return moves;

		},

		5: function(x, y, board) { // pawn
			var moves = [];

			if(MoveCount == 0 && x + 2 <= 7 && board[x + 2][y] == undefined)
				moves.push({ x: x + 2, y: y }); MoveCount = 1;
			if(x + 1 <= 7 && y + 1 <= 7 && board[x + 1][y + 1].Color == ~this.Color)
				moves.push({ x: x + 1, y: y + 1 });
			if(x - 1 >= 0 && y + 1 <= 7 && board[x - 1][y + 1].Color == ~this.Color)
				moves.push({ x: x - 1, y: y + 1 });
			if(x + 1 <= 7 && board[x + 1][y] == undefined)
				moves.push({ x: x + 1, y: y });

			if(x + 1 == 7)
				this.Type = PieceEnum.Queen;


		}
	}
};

Piece.prototype.constructor = Piece;

module.Piece = Piece;

function Board() {
	this.InitializeBoard();
	this.TurnColor = ColorEnum.White;
}

Board.prototype = {
	board: undefined,
	TurnColor: undefined,
	Validate: function(prevX, prevY, currX, currY) {
		var FromPiece = this.board[prevX][prevY];
		var ToPiece = this.board[currX][currY];

		if(FromPiece.Color == ToPiece.Color)
			return "You can't take a piece of your own color";




		TurnColor = ~TurnColor;



	},
	InitializeBoard: function () {
		this.board = new Array(8);
		for(var i = 0; i < 8; i++) {
			var row = new Array(8);

			if(i == 0) {
				row[0] = new Piece(0,0,PieceEnum.Rook,ColorEnum.Black,PieceImgMap[PieceEnum.Rook.toString() + ColorEnum.Black.toString()]);
				row[1] = new Piece(0,1,PieceEnum.Knight,ColorEnum.Black,PieceImgMap[PieceEnum.Knight.toString() + ColorEnum.Black.toString()]);
				row[2] = new Piece(0,2,PieceEnum.Bishop,ColorEnum.Black,PieceImgMap[PieceEnum.Bishop.toString() + ColorEnum.Black.toString()]);
				row[3] = new Piece(0,3,PieceEnum.Queen,ColorEnum.Black,PieceImgMap[PieceEnum.Queen.toString() + ColorEnum.Black.toString()]);
				row[4] = new Piece(0,4,PieceEnum.King,ColorEnum.Black,PieceImgMap[PieceEnum.King.toString() + ColorEnum.Black.toString()]);
				row[5] = new Piece(0,5,PieceEnum.Bishop, ColorEnum.Black,PieceImgMap[PieceEnum.Bishop.toString() + ColorEnum.Black.toString()]);
				row[6] = new Piece(0,6,PieceEnum.Knight,ColorEnum.Black,PieceImgMap[PieceEnum.Knight.toString() + ColorEnum.Black.toString()]);
				row[7] = new Piece(0,7,PieceEnum.Rook, ColorEnum.Black,PieceImgMap[PieceEnum.Rook.toString() + ColorEnum.Black.toString()]);
			}
			else if(i == 1) {

				for(var j = 0; j < row.length; j++) {
					row[j] = new Piece(1,j,PieceEnum.Pawn,ColorEnum.Black, PieceImgMap[PieceEnum.Pawn.toString() + ColorEnum.Black.toString()]);
				}

			}
			else if(i == 6) {

				for(var j = 0; j < row.length; j++) {
					row[j] = new Piece(6,j,PieceEnum.Pawn,ColorEnum.White, PieceImgMap[PieceEnum.Pawn.toString() + ColorEnum.White.toString()]);
				}

			}
			else if(i == 7) {

				row[0] = new Piece(7,0,PieceEnum.Rook,ColorEnum.White,PieceImgMap[PieceEnum.Rook.toString() + ColorEnum.White.toString()]);
				row[1] = new Piece(7,1,PieceEnum.Knight,ColorEnum.White,PieceImgMap[PieceEnum.Knight.toString() + ColorEnum.White.toString()]);
				row[2] = new Piece(7,2,PieceEnum.Bishop,ColorEnum.White,PieceImgMap[PieceEnum.Bishop.toString() + ColorEnum.White.toString()]);
				row[3] = new Piece(7,3,PieceEnum.Queen,ColorEnum.White,PieceImgMap[PieceEnum.Queen.toString() + ColorEnum.White.toString()]);
				row[4] = new Piece(7,4,PieceEnum.King,ColorEnum.White,PieceImgMap[PieceEnum.King.toString() + ColorEnum.White.toString()]);
				row[5] = new Piece(7,5,PieceEnum.Bishop, ColorEnum.White,PieceImgMap[PieceEnum.Bishop.toString() + ColorEnum.White.toString()]);
				row[6] = new Piece(7,6,PieceEnum.Knight,ColorEnum.White,PieceImgMap[PieceEnum.Knight.toString() + ColorEnum.White.toString()]);
				row[7] = new Piece(7,7,PieceEnum.Rook, ColorEnum.White,PieceImgMap[PieceEnum.Rook.toString() + ColorEnum.White.toString()]);
			}

			this.board[i] = row;
		}
	} 
};

Board.prototype.constructor = Board;

module.exports.Board = Board;