import { useContext, useEffect, useState } from 'react';
import * as S from './styles';
import { Character } from '../../components/Character';
import { useCharacter } from '../../hooks/useCharacter';
import { SocketContext } from '../../services/socket';
import { CharacterSides } from '../../types/CharacterSides';

export const GameMatch = () => {
  const socket = useContext(SocketContext);

  const player1 = useCharacter(socket.id, 3, 5);
  const [ player2, setPlayer2 ] = useState({
    name: '',
    side: 'down' as CharacterSides,
    x: 3,
    y: 5,
  })

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    socket.on("gameMove", (data) => {
      // console.log(data);

      setPlayer2({
        name: data.playerId,
        side: data.side,
        x: data.xAxis,
        y: data.yAxis,
      })
    });
  }, []);

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
    <S.Container>
      <S.Map>
        <Character x={player1.x} y={player1.y} side={player1.side} name={player1.name} />
        <Character x={player2.x} y={player2.y} side={player2.side} name={player2.name} />
      </S.Map>
    </S.Container>
  );
}
