import { Board, Coordinate, PlayerTurn } from "../types";
import _ from "lodash";

export const createBoard = (): Board => {
  const board: PlayerTurn[][] = [];
  for (let i = 0; i < 3; i++) {
    board.push(Array.from(new Array(3)));
  }

  return board;
};

export const hasNoTilesLeft = (board: Board) => {
  for (let row = 0; row < board.length; row++) {
    for (let column = 0; column < board[row].length; column++) {
      if (!board[row][column]) {
        return false;
      }
    }
  }

  return true;
};

export const convertBoardToNumericValue = (board: Board): -1 | 0 | 1 => {
  if (getWinner(board) === "X") {
    return 1;
  } else if (getWinner(board) === "O") {
    return -1;
  }

  return 0;
};

export const getWinner = (board: Board): PlayerTurn | null => {
  // check columns
  for (let row = 0; row < board.length; row++) {
    for (let column = 0; column < board[row].length; column++) {
      if (!board[row][column]) {
        break;
      }

      if (column === 0) {
        continue;
      }

      if (board[row][column - 1] !== board[row][column]) {
        break;
      }

      if (
        column === board[row].length - 1 &&
        board[row][column] !== undefined
      ) {
        return board[row][column];
      }
    }
  }

  // check rows
  for (let column = 0; column < board[0].length; column++) {
    for (let row = 0; row < board.length; row++) {
      if (!board[row][column]) {
        break;
      }

      if (row === 0) {
        continue;
      }

      if (board[row - 1][column] !== board[row][column]) {
        break;
      }

      if (row === board.length - 1 && board[row][column] !== undefined) {
        return board[row][column];
      }
    }
  }

  // check diagnal
  for (let row = 0, column = 0; row < board.length; row++, column++) {
    if (!board[row][column]) {
      break;
    }
    if (row === 0 && column === 0) {
      continue;
    }

    if (board[row - 1][column - 1] !== board[row][column]) {
      break;
    }

    if (row === board.length - 1 && board[row][column] !== undefined) {
      return board[row][column];
    }
  }

  for (
    let row = 0, column = board.length - 1;
    row < board.length;
    row++, column--
  ) {
    if (!board[row][column]) {
      break;
    }

    if (row === 0 && column === board.length - 1) {
      continue;
    }

    if (board[row - 1][column + 1] !== board[row][column]) {
      break;
    }

    if (row === board.length - 1 && board[row][column] !== undefined) {
      return board[row][column];
    }
  }

  return null;
};

export const getResult = (
  board: Board,
  action: Coordinate,
  turn: PlayerTurn
): Board => {
  const copy = _.cloneDeepWith(board);
  copy[action.row][action.column] = turn;
  return [...copy];
};

export const getActions = (board: Board): Coordinate[] => {
  const res: Coordinate[] = [];
  for (let row = 0; row < board.length; row++) {
    for (let column = 0; column < board[row].length; column++) {
      if (!board[row][column]) {
        res.push({ row, column });
      }
    }
  }

  return res;
};

export const getPlayer = (board: Board, firstMove: PlayerTurn): PlayerTurn => {
  let xCount = 0,
    oCount = 0;
  for (let row = 0; row < board.length; row++) {
    for (let column = 0; column < board[row].length; column++) {
      if (board[row][column] === "O") {
        oCount++;
      } else {
        xCount++;
      }
    }
  }

  if (xCount > oCount) {
    return "O";
  }

  if (xCount < oCount) {
    return "X";
  }

  return firstMove === "O" ? "X" : "O";
};

export const getMax = (board: Board) => {
  if (hasNoTilesLeft(board) || !!getWinner(board)) {
    return convertBoardToNumericValue(board);
  }

  let maxValue = Number.MIN_SAFE_INTEGER;
  const actions = getActions(board);

  actions.forEach((action) => {
    const supposedBoard = getResult(board, action, "O");
    maxValue = Math.max(maxValue, getMin(supposedBoard));
  });

  return maxValue;
};

export const getMin = (board: Board) => {
  if (hasNoTilesLeft(board) || !!getWinner(board)) {
    return convertBoardToNumericValue(board);
  }

  let minValue = Number.MAX_SAFE_INTEGER;
  const actions = getActions(board);

  actions.forEach((action) => {
    const supposedBoard = getResult(board, action, "X");
    minValue = Math.min(minValue, getMax(supposedBoard));
  });

  return minValue;
};
