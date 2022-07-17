import { useState } from 'react';
import { CharacterSides } from '../types/CharacterSides';
import { mapSpots } from '../utils/mapSpots';

export const useCharacter = (playerName: string, xAxis: number, yAxis: number) => {
    const [name, setName] = useState(playerName);
    const [pos, setPos] = useState({ x: xAxis, y: yAxis });
    const [side, setSide] = useState<CharacterSides>('down');

    const moveLeft = () => {
        setPos(pos => ({
            x: canMove(pos.x - 1, pos.y) ? pos.x - 1 : pos.x,
            y: pos.y
        }));
        setSide('left');
    }
    const moveRight = () => {
        setPos(pos => ({
            x: canMove(pos.x + 1, pos.y) ? pos.x + 1 : pos.x,
            y: pos.y
        }));
        setSide('right');
    }
    const moveDown = () => {
        setPos(pos => ({
            x: pos.x,
            y: canMove(pos.x, pos.y + 1) ? pos.y + 1 : pos.y
        }));
        setSide('down');
    }
    const moveUp = () => {
        setPos(pos => ({
            x: pos.x,
            y: canMove(pos.x, pos.y - 1) ? pos.y - 1 : pos.y
        }));
        setSide('up');
    }

    const canMove = (x: number, y: number) => {
        if(mapSpots[y] !== undefined && mapSpots[y][x] !== undefined) {
            if (mapSpots[y][x] !== 0) {
                return true
            }
        }
        return false;
    }

    return {
        name,
        x: pos.x,
        y: pos.y,
        side,
        moveLeft,
        moveRight,
        moveDown,
        moveUp
    };
}