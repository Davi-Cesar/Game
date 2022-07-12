import { useEffect } from 'react';
import * as S from './styles';
import { Character } from '../../components/Character';
import { useCharacter } from '../../hooks/useCharacter';

export const GameMatch = () => {
  const char = useCharacter('Player1', 3, 5);
  const char2 = useCharacter('Player2', 12, 5);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    switch(e.code) {
      case 'KeyA':
      case 'ArrowLeft':
        char.moveLeft();
      break;
      case 'KeyW':
      case 'ArrowUp':
        char.moveUp();
      break;
      case 'KeyD':
      case 'ArrowRight':
        char.moveRight();
      break;
      case 'KeyS':
      case 'ArrowDown':
        char.moveDown();
      break;
    }
  }

  return (
    <S.Container>
      <S.Map>
        <Character x={char.x} y={char.y} side={char.side} name={char.name} />
        <Character x={char2.x} y={char2.y} side={char2.side} name={char2.name} />
      </S.Map>
    </S.Container>
  );
}
