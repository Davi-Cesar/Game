import { CharacterSides } from "../types/CharacterSides";

export const canHit = (player1X: number, player1Y: number, player2X: number, player2Y: number, player1Side: CharacterSides) => {
  // console.log('Player1 Side: ' + player1Side);
  // console.log('Player1 - X: ' + player1X + ' | Y: ' + player1Y);
  // console.log('Player2 - X: ' + player2X + ' | Y: ' + player2Y);

  if (player1X == player2X && (player1Y - player2Y == -1) && (player1Side == 'down')) {
    return true
  }

  if (player1X == player2X && (player1Y - player2Y == 1) && (player1Side == 'up')) {
    return true
  }

  if (player1Y == player2Y && (player1X - player2X == -1) && (player1Side == 'right')) {
    return true
  }

  if (player1Y == player2Y && (player1X - player2X == 1) && (player1Side == 'left')) {
    return true
  }

  return false
}