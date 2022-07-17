import { CharacterSides } from "../types/CharacterSides";
import { mapSpots } from "./mapSpots";

export const WeaponsList = [
  {
    name: 'Punch',
    damage: 0.5,
    defaultPosition: {
      x: -30,
      y: -30,
    },
    image: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgetdrawings.com%2Fvectors%2Ffist-punch-vector-6.png&f=1&nofb=1'
  },
  {
    name: 'Sword',
    damage: 5,
    defaultPosition: {
      x: 60,
      y: 60,
    },
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebstockreview.net%2Fimages%2Fclipart-sword-vector-1.png&f=1&nofb=1'
  },
  {
    name: 'Axe',
    damage: 7.5,
    defaultPosition: {
      x: 120,
      y: 270,
    },
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Fhalloween%2F512%2Fhatchet-512.png&f=1&nofb=1'
  },
  {
    name: 'Halberd',
    damage: 10,
    defaultPosition: {
      x: 420,
      y: 120,
    },
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd30y9cdsu7xlg0.cloudfront.net%2Fpng%2F440119-200.png&f=1&nofb=1'
  },
]

export const canHit = (player1X: number, player1Y: number, player2X: number, player2Y: number, player1Side: CharacterSides) => {
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

export const checkWeapon = (xAxis: number, yAxis: number) => {
  if (mapSpots[yAxis][xAxis] === 2) {
    return WeaponsList[1]
  }

  if (mapSpots[yAxis][xAxis] === 3) {
    return WeaponsList[2]
  }

  if (mapSpots[yAxis][xAxis] === 4) {
    return WeaponsList[3]
  }

  return false
}

export const receiveDamage = (currentLife: number, damage: number) => {
  if (currentLife > 0) {
    const newLife = currentLife - damage

    if (newLife < 0) {
      return 0
    }

    return newLife
  }

  return currentLife
}

// export const receiveDamage = (currentLife: number, currentShield: number, damage: number) => {
//   if (currentShield > 0) {
//     // console.log('There Shield');
    
//     return {
//       life: currentLife,
//       shield: (currentShield-=damage)
//     }
//   }

//   if (currentLife > 0) {
//     // console.log('There Life');

//     currentLife = currentLife-damage
    
//     return {
//       life: currentLife,
//       shield: 0
//     }
//   }

//   return {
//     life: currentLife,
//     shield: 0
//   }
// }