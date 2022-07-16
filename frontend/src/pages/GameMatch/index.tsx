import * as S from './styles';
import { useContext, useEffect, useState } from 'react';
import { useCharacter } from '../../hooks/useCharacter';

import { CharacterSides } from '../../types/CharacterSides';
import { Character } from '../../components/Character';
import { Hud } from '../../components/Hud';

import { SocketContext } from '../../services/socket';
import { canHit } from '../../utils/general';

export const GameMatch = () => {
  const socket = useContext(SocketContext);

  const player1 = useCharacter(socket.id, 3, 5);
  const [ player2, setPlayer2 ] = useState({
    name: '',
    side: 'down' as CharacterSides,
    x: 3,
    y: 5,
  })

  const [ player1Hud, setPlayer1Hud ] = useState({
    life: 100
  })

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown); 
  }, [])

  useEffect(() => {
    socket.on("gameMove", (data) => {
      // console.log(data);

      setPlayer2({
        name: data.playerId,
        side: data.side,
        x: data.xAxis,
        y: data.yAxis,
      })
    });

    socket.on("hit", (data) => {
      // console.log(data);

      setPlayer1Hud({
        life: (player1Hud.life > 0) ? player1Hud.life-=data.damage : player1Hud.life
      })
    });
  }, []);

  const handleMouseClick = () => {
    if (canHit(player1.x, player1.y, player2.x, player2.y, player1.side)) {
      // console.log('Hit: ');

      socket.emit("hit", {
        damage: 2
      });
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    switch(e.code) {
      case 'KeyA':
      case 'ArrowLeft':
        player1.moveLeft();
      break;
      case 'KeyW':
      case 'ArrowUp':
        player1.moveUp();
      break;
      case 'KeyD':
      case 'ArrowRight':
        player1.moveRight();
      break;
      case 'KeyS':
      case 'ArrowDown':
        player1.moveDown();
      break;
    }
  }

  return (
    <S.Container onClick={handleMouseClick}>
      <S.Map>
        <Character x={player1.x} y={player1.y} side={player1.side} name={player1.name} />
        <Character x={player2.x} y={player2.y} side={player2.side} name={player2.name} />
      </S.Map>
      <Hud life={player1Hud.life} />
    </S.Container>
  );
}
