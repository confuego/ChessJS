var PieceEnum = {
	King: {
		value: 0,
		moves: function(board) {

			var moves = [];

			if(this.x - 1 > -1 && this.CanMove(8, 8, this.x - 1, this.y, board))
				moves.push({ x: this.x - 1, y: this.y });
			if(this.x + 1 <= 7 && this.CanMove(8, 8, this.x + 1, this.y, board))
				moves.push({ x: this.x + 1, y: this.y });
			if(this.y + 1 <= 7 && this.CanMove(8, 8, this.x, this.y + 1, board))
				moves.push({ x: this.x, y: this.y + 1 });
			if(this.y - 1 > -1 && this.CanMove(8, 8, this.x, this.y - 1, board))
				moves.push({ x: this.x, y: this.y - 1 });
			if(this.y + 1 <= 7 && this.x + 1 <= 7 && this.CanMove(8, 8, this.x + 1, this.y + 1, board))
				moves.push({ x: this.x + 1, y: this.y + 1 });
			if(this.x - 1 > -1 && this.y - 1 > -1 && this.CanMove(8, 8, this.x - 1, this.y - 1, board))
				moves.push({ x: this.x - 1, y: this.y - 1 });
			if(this.x + 1 <= 7 && this.y - 1 > -1 && this.CanMove(8, 8, this.x + 1, this.y - 1, board))
				moves.push({ x: this.x + 1, y: this.y - 1 });
			if(this.x - 1 > -1 && this.y + 1 <= 7 && this.CanMove(8, 8, this.x - 1, this.y + 1, board))
				moves.push({ x: this.x - 1, y: this.y + 1 });

			return moves;
		}
	},
	Queen: {
		value: 1,
		moves: function(board) {

			var moves = [];

			moves = this.GetDiagonal(this.x, this.y, board);

			moves = moves.concat(this.GetHorizontal(this.x, this.y, board));

			moves = moves.concat(this.GetVertical(this.x, this.y, board));

			return moves;

		}
	},
	Rook: {
		value: 2,
		moves: function(board) {

			var moves = [];

			moves = this.GetVertical(this.x, this.y, board);
			moves = moves.concat(this.GetHorizontal(this.x, this.y, board));

			return moves;

		}
	},
	Bishop: {
		value: 3,
		moves: function(board) {

			return this.GetDiagonal(this.x, this.y, board);

		}
	},
	Knight: {
		value: 4,
		moves: function(board) {
			var moves = [];

			if(this.x + 1 <= 7 && this.y + 2 <= 7 && this.CanMove(8, 8, this.x + 1, this.y + 2, board))
				moves.push({ x: this.x + 1, y: this.y + 2 });
			if(this.x - 1 > -1 && this.y + 2 <= 7 && this.CanMove(8, 8, this.x - 1, this.y + 2, board))
				moves.push({ x: this.x - 1, y: this.y + 2 });
			if(this.y - 1 >= 0 && this.x - 2 >= 0 && this.CanMove(8, 8, this.x - 2, this.y - 1, board))
				moves.push({ x: this.x - 2, y: this.y - 1 });
			if(this.y - 1 > -1 && this.x + 2 <= 7 && this.CanMove(8, 8, this.x + 2, this.y - 1, board))
				moves.push({ x: this.x + 2, y: this.y - 1});
			if(this.y - 2 >= 0 && this.x - 1 > -1 && this.CanMove(8, 8, this.x - 1, this.y - 2, board))
				moves.push({ x: this.x - 1, y: this.y - 2 });
			if(this.y - 2 > -1 && this.x + 1 <= 7 && this.CanMove(8, 8, this.x + 1, this.y - 2, board))
				moves.push({ x: this.x + 1, y: this.y - 2 });

			return moves;

		}
	},
	Pawn: {
		value: 5,
		moves: function(board) {
			var moves = [];
			if(this.MoveCount == 0 && this.y + 2 <= 7 && this.GetPiece(this.x, this.y + 2, board) == undefined)
				moves.push({ x: this.x, y: this.y + 2 }); 
			if(this.x + 1 <= 7 && this.y + 1 <= 7 && this.GetPiece(this.x + 1, this.y + 1, board) && this.GetPiece(this.x + 1, this.y + 1, board).Color == ~this.Color )
				moves.push({ x: this.x + 1, y: this.y + 1 });
			if(this.x + 1 <= 7 && this.y - 1 > -1 && this.GetPiece(this.x + 1, this.y - 1, board) && this.GetPiece(this.x + 1, this.y - 1, board).Color == ~this.Color )
				moves.push({ x: this.x + 1, y: this.y - 1 });
			if(this.y + 1 <= 7 && this.GetPiece(this.x, this.y + 1, board) == undefined)
				moves.push({ x: this.x, y: this.y + 1 });

			if(this.x + 1 == 7)
				this.Type = PieceEnum.Queen;

			this.MoveCount = 1;

			return moves;

		}
	}
};

module.exports.PieceEnum = PieceEnum;

var ColorEnum = {
	Black: 0,
	White: -1
};

module.exports.ColorEnum = ColorEnum;

var PieceImgMap = {
	"00": "&#9819;", // black king
	"0-1": "&#9813;", // white king
	"10": "&#9818;", // black queen 
	"1-1": "&#9812;", // white queen 
	"20": "&#9820;", // rook black
	"2-1": "&#9814;", // rook white
	"30": "&#9821;", // bishop black
	"3-1": "&#9815;", // bishop white
	"40": "&#9822;", // knight black
	"4-1": "&#9816;", // knight white
	"50": "&#9823;", // pawn black
	"5-1": "&#9817;", // pawn white
};

module.exports.PieceImgMap = PieceImgMap;

function Piece(x, y, type, color, img) {

	this.x = x;
	this.y = y;
	this.Type = type.value;
	this.Moves = type.moves;
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
	Moves: undefined,
	CanMove: function(PrevX, PrevY, CurrX, CurrY, board) {

		var CheckColorOrEmpty = ( this.GetPiece(CurrX, CurrY, board) == undefined || this.GetPiece(CurrX, CurrY, board).Color == ~this.Color );

		if( ( PrevX > -1 && PrevX <= 7 ) && ( PrevY > -1 && PrevY <= 7 ) ) {

			return ( this.GetPiece(PrevX, PrevY, board) == undefined || ( PrevX == this.x && PrevY == this.y ) ) && CheckColorOrEmpty;
		}

		return CheckColorOrEmpty;
	},
	GetHorizontal: function(x, y, board) {

		var moves = [];

		for(var i = 0; i < x; i++) {

			if(this.CanMove(i -1, y, i,y,board))
				moves.push({ x: i, y: y });
		}

		for(var i = x + 1; i < 8; i++) {

			if(this.CanMove(i - 1, y, i,y,board))
				moves.push({ x: i, y: y });	
		}

		return moves;
	},
	GetVertical: function(x, y, board) {

		var moves = [];

		for(var i = 0; i < y; i++) {
			if(this.CanMove(x, i - 1, x, i, board))
				moves.push({ x: x, y: i });
			else break;
		}

		for(var i = y + 1; i <= 7; i++) {
			if(this.CanMove(x, i - 1, x, i, board))
				moves.push({ x: x, y: i });
			else break;
		}

		return moves;
	},
	GetDiagonal: function(x, y, board) {
		var moves = [];

		// above x-axis - bottom to top diagonal
		for(var i = x + 1, j = y + 1; i <= 7 && j <= 7; i++, j++) {

			if(this.CanMove(i - 1, j - 1, i, j, board))
				moves.push({ x: i, y: j });
			else  break;
		}

		//below x-axis - bottom to top diagonal
		for(var i = x - 1, j = y - 1; i >= 0 && j >= 0; i++, j++) {

			if(this.CanMove(i - 1, j - 1, i, j, board))
				moves.push({ x: i, y: j });
			else break;
		}

		//above x-axis - top to bottom diagonal
		for(var i = x - 1, j = y + 1; i >= 0 && j <= 7; i++, j++) {

			if(this.CanMove(i - 1, j - 1, i, j, board))
				moves.push({ x: i, y: j });
			else break;
		}

		//below x-axis - top to bottom diagonal
		for(var i = x + 1, j = y - 1; i <= 7 && j >= 0; i++, j++) {
			
			if(this.CanMove(i - 1, j - 1, i, j, board))
				moves.push({ x: i, y: j });
			else break;
		}

		return moves;
	},
	GetPiece: function(x, y, board) {

		return board[y][x];
	},
};

Piece.prototype.constructor = Piece;

module.exports.Piece = Piece;

function Board() {
	this.InitializeBoard();
	this.TurnColor = ColorEnum.White;
}

Board.prototype = {
	board: undefined,
	TurnColor: undefined,
	FlipBoard: function() {

		var flipped = new Array(8);

		for(var i = 0; i < this.board.length; i++) {

			var opposite_index = this.board.length - i - 1;
			flipped[i] = this.board[opposite_index];

			flipped[i].forEach( function(d) {
				d.y = i;
			});
		}

		return flipped;
	},
	CheckMoves: function(moves, x , y) {
		for(var i = 0; i < moves.length; i++) {
			if(moves[i].x == x && moves[i].y == y)
				return true;
		}
		return false;

	},
	PrintBoard: function(board) {
		for(var i = 0; i < board.length; i++) {
			var color = [];

			for(var j = 0; j < board.length; j++ ) {
				if(board[i][j]) color.push(board[i][j].Color);
				else color.push("Empty");
			}

			console.log(color);

		}
		console.log("\n");
	}, 
	Validate: function(prevRow, prevCol, currRow, currCol) {
		var board = undefined;
		var FromPiece = this.board[prevRow][prevCol];
		var ToPiece = this.board[currRow][currCol];
		var valid = false;
		var row = currRow;
		var moves = [];

		if(ToPiece && FromPiece && FromPiece.Color == ToPiece.Color)
			return "You can't take a piece of your own color";

		if(FromPiece.Color == ColorEnum.White) {

			board = this.FlipBoard();
			row = this.board.length - currRow - 1;
		}
		else {

			board = this.board;
		}

		moves = FromPiece.Moves(board);

		console.log(moves);

		valid = this.CheckMoves(moves, currCol, row);

		console.log(valid);
		this.TurnColor = ~this.TurnColor;



	},
	InitializeBoard: function () {
		this.board = new Array(8);
		for(var i = 0; i < 8; i++) {
			var row = new Array(8);

			if(i == 0) {

				row[0] = new Piece(0,0,PieceEnum.Rook,ColorEnum.Black,PieceImgMap[PieceEnum.Rook.value.toString() + ColorEnum.Black.toString()]);
				row[1] = new Piece(1,0,PieceEnum.Knight,ColorEnum.Black,PieceImgMap[PieceEnum.Knight.value.toString() + ColorEnum.Black.toString()]);
				row[2] = new Piece(2,0,PieceEnum.Bishop,ColorEnum.Black,PieceImgMap[PieceEnum.Bishop.value.toString() + ColorEnum.Black.toString()]);
				row[3] = new Piece(3,0,PieceEnum.Queen,ColorEnum.Black,PieceImgMap[PieceEnum.Queen.value.toString() + ColorEnum.Black.toString()]);
				row[4] = new Piece(4,0,PieceEnum.King,ColorEnum.Black,PieceImgMap[PieceEnum.King.value.toString() + ColorEnum.Black.toString()]);
				row[5] = new Piece(5,0,PieceEnum.Bishop, ColorEnum.Black,PieceImgMap[PieceEnum.Bishop.value.toString() + ColorEnum.Black.toString()]);
				row[6] = new Piece(6,0,PieceEnum.Knight,ColorEnum.Black,PieceImgMap[PieceEnum.Knight.value.toString() + ColorEnum.Black.toString()]);
				row[7] = new Piece(7,0,PieceEnum.Rook, ColorEnum.Black,PieceImgMap[PieceEnum.Rook.value.toString() + ColorEnum.Black.toString()]);
			}
			else if(i == 1) {

				for(var j = 0; j < row.length; j++) {
					row[j] = new Piece(j, 1, PieceEnum.Pawn,ColorEnum.Black, PieceImgMap[PieceEnum.Pawn.value.toString() + ColorEnum.Black.toString()]);
				}

			}
			else if(i == 6) {

				for(var j = 0; j < row.length; j++) {
					row[j] = new Piece(j, 6, PieceEnum.Pawn, ColorEnum.White, PieceImgMap[PieceEnum.Pawn.value.toString() + ColorEnum.White.toString()]);
				}

			}
			else if(i == 7) {

				row[0] = new Piece(0,7,PieceEnum.Rook,ColorEnum.White,PieceImgMap[PieceEnum.Rook.value.toString() + ColorEnum.White.toString()]);
				row[1] = new Piece(1,7,PieceEnum.Knight,ColorEnum.White,PieceImgMap[PieceEnum.Knight.value.toString() + ColorEnum.White.toString()]);
				row[2] = new Piece(2,7,PieceEnum.Bishop,ColorEnum.White,PieceImgMap[PieceEnum.Bishop.value.toString() + ColorEnum.White.toString()]);
				row[3] = new Piece(3,7,PieceEnum.Queen,ColorEnum.White,PieceImgMap[PieceEnum.Queen.value.toString() + ColorEnum.White.toString()]);
				row[4] = new Piece(4,7,PieceEnum.King,ColorEnum.White,PieceImgMap[PieceEnum.King.value.toString() + ColorEnum.White.toString()]);
				row[5] = new Piece(5,7,PieceEnum.Bishop, ColorEnum.White,PieceImgMap[PieceEnum.Bishop.value.toString() + ColorEnum.White.toString()]);
				row[6] = new Piece(6,7,PieceEnum.Knight,ColorEnum.White,PieceImgMap[PieceEnum.Knight.value.toString() + ColorEnum.White.toString()]);
				row[7] = new Piece(7,7,PieceEnum.Rook, ColorEnum.White,PieceImgMap[PieceEnum.Rook.value.toString() + ColorEnum.White.toString()]);
			}

			this.board[i] = row;
		}
	} 
};

Board.prototype.constructor = Board;

module.exports.Board = Board;