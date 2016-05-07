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
	White: 1
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

}

Piece.prototype  = {
	x: undefined,
	y: undefined,
	Type: undefined,
	Color: undefined,
	Moves: undefined,
	Img: undefined
};

Piece.prototype.constructor = Piece;

module.Piece = Piece;

function Board() {
	this.InitializeBoard();
}

Board.prototype = {
	board: undefined,
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
					row[j] = new Piece(1,j,PieceEnum.Pawn,ColorEnum.Black);
				}

			}
			else if(i == 6) {

				for(var j = 0; j < row.length; j++) {
					row[j] = new Piece(6,j,PieceEnum.Pawn,ColorEnum.White);
				}

			}
			else if(i == 7) {
				row[0] = new Piece(0,0,PieceEnum.Rook,ColorEnum.White,PieceImgMap[PieceEnum.Rook.toString() + ColorEnum.White.toString()]);
				row[1] = new Piece(0,1,PieceEnum.Knight,ColorEnum.White,PieceImgMap[PieceEnum.Knight.toString() + ColorEnum.White.toString()]);
				row[2] = new Piece(0,2,PieceEnum.Bishop,ColorEnum.White,PieceImgMap[PieceEnum.Bishop.toString() + ColorEnum.White.toString()]);
				row[3] = new Piece(0,3,PieceEnum.Queen,ColorEnum.White,PieceImgMap[PieceEnum.Queen.toString() + ColorEnum.White.toString()]);
				row[4] = new Piece(0,4,PieceEnum.King,ColorEnum.White,PieceImgMap[PieceEnum.King.toString() + ColorEnum.White.toString()]);
				row[5] = new Piece(0,5,PieceEnum.Bishop, ColorEnum.White,PieceImgMap[PieceEnum.Bishop.toString() + ColorEnum.White.toString()]);
				row[6] = new Piece(0,6,PieceEnum.Knight,ColorEnum.White,PieceImgMap[PieceEnum.Knight.toString() + ColorEnum.White.toString()]);
				row[7] = new Piece(0,7,PieceEnum.Rook, ColorEnum.White,PieceImgMap[PieceEnum.Rook.toString() + ColorEnum.White.toString()]);
			}

			this.board[i] = row;
		}
	} 
};

Board.prototype.constructor = Board;

module.exports.Board = Board;