import { Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";

export default async function (server: FastifyInstance) {
  function fillpawns(row: string[], color: string) {
    const postfix = color == "white" ? " " : "*";
    return row.map((i: any) => " P" + postfix);
  }
  function fillpieces(color: string) {
    const pieces = ["R", "H", "B", "Q", "K", "B", "H", "R"];
    const postfix = color == "white" ? " " : "*";
    return pieces.map((i) => " " + i + postfix);
  }

  function printStartingChess() {
    const game: any[] = [];
    const head = [" A ", " B ", " C ", " D ", " E ", " F ", " G ", " H "];
    const board = Array(8).fill(Array(8).fill("   "));
    game.push(head.join("|"));
    game.push("--------------------------------");
    board.map((row, index) => {
      const colNumber = index + 1;
      if (colNumber == 1 || colNumber == 8) {
        const color = colNumber == 1 ? "white" : "black";
        row = fillpieces(color);
      }
      if (colNumber == 2 || colNumber == 7) {
        const color = colNumber == 2 ? "white" : "black";
        row = fillpawns(row, color);
      }

      game.push(row.join("|") + colNumber);
      game.push("--------------------------------");
    });
    return game;
  }

  function fillRowPieces(string: string) {
    let row = [];
    const pieces: any = {
      p: " p ",
      r: " r ",
      n: " n ",
      b: " b ",
      q: " q ",
      k: " k ",
      P: " P ",
      R: " R ",
      N: " N ",
      B: " B ",
      Q: " Q ",
      K: " K ",
    };
    for (const char of string.split("")) {
      if (pieces[char] !== undefined) {
        row.push(pieces[char]);
      } else {
        for (let i = 1; i <= +char; i++) {
          row.push("   ");
        }
      }
    }
    return row;
  }

  function printChess(chessArr: string[]) {
    const game = [];
    const head = [" A ", " B ", " C ", " D ", " E ", " F ", " G ", " H "];
    const board = Array(8).fill(Array(8).fill("   "));
    game.push(head.join("|"));
    game.push("--------------------------------");
    board.map((row, index) => {
      let colNumber = index + 1;
      row = fillRowPieces(chessArr[index]);
      game.push(row.join("|") + "|" + colNumber);
      game.push("--------------------------------");
    });
	return game
  }

  server.route({
    method: "GET",
    url: "/",
    handler: async (request, reply) => {
      return "welcome user, please start the game by going to /game";
    },
  });

  server.route({
    method: "GET",
    url: "/game",
    schema: {
      tags: ["game"],
      description: "this is the route to see the starting game position",
    },
    handler: async (request, reply) => {
      return printStartingChess();
    },
  });

  server.route<{ Body: { board: String } }>({
    method: "POST",
    url: "/game",
    schema: {
      tags: ["game"],
      description: "this is the route to display the board",
      body: {
        board: Type.String(),
      },
    },
    handler: async (request, reply) => {
      const item = request.body.board;
      return printChess(item.split("/"));
    },
  });
}
