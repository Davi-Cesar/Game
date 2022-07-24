import * as S from "./styles";
import { useContext, useEffect, useState } from "react";
import { useCharacter } from "../../hooks/useCharacter";

import { CharacterSides } from "../../types/CharacterSides";
import { Character } from "../../components/Character";
import { Hud } from "../../components/Hud";

import { SocketContext } from "../../services/socket";
import {
  canHit,
  checkWeapon,
  receiveDamage,
  WeaponsList,
} from "../../utils/general";

export const GameMatch = () => {
  const socket = useContext(SocketContext);

  const urlSearch = new URLSearchParams(window.location.search);
  const roomId = urlSearch.get("room") as string | "";
  const username = urlSearch.get("username") as string | "";
  const opponentId = urlSearch.get("opponentId") as string | "";
  const [endGame, setEndGame] = useState("");

  const player1 = useCharacter(username, 3, 5);
  const [player2, setPlayer2] = useState({
    name: "",
    side: "down" as CharacterSides,
    x: 3,
    y: 5,
    life: 1000,
  });

  const [player1Hud, setPlayer1Hud] = useState({
    life: 1000,
    weapon: "Empty",
    weaponImage: WeaponsList[0].image,
    damage: 0.5,
  });

  useEffect(() => {
    socket.on("gameMove", (data) => {
      // console.log(data);

      setPlayer2((player2) => ({
        ...player2,
        name: data.playerId,
        side: data.side,
        x: data.xAxis,
        y: data.yAxis,
      }));
    });

    socket.on("hit", (data) => {
      // console.log(data);

      setPlayer1Hud((player1Hud) => ({
        ...player1Hud,
        life: receiveDamage(player1Hud.life, data.damage),
      }));
    });

    socket.on("opponentLife", (data) => {
      // console.log(data);

      if (data.life === 0) {
        socket.emit("endGame", {
          winner: username,
          opponentId: opponentId,
          roomId: +roomId,
        });
        endGame === username
          ? setEndGame(username + " perdeu a batalha!")
          : setEndGame(username + " venceu a batalha!");
      }
      setPlayer2((player2) => ({
        ...player2,
        life: data.life,
      }));
    });

    socket.on("endGame", (data) => {
      setEndGame(username + " perdeu a batalha!");
    });
  }, [socket, endGame]);

  useEffect(() => {
    socket.emit("gameMove", {
      playerId: player1.name,
      side: player1.side,
      xAxis: player1.x,
      yAxis: player1.y,
      opponentId: opponentId,
    });

    const newWeapon = checkWeapon(player1.x, player1.y);

    if (newWeapon) {
      // console.log('Changed weapon');

      setPlayer1Hud((player1Hud) => ({
        ...player1Hud,
        weapon: newWeapon.name,
        weaponImage: newWeapon.image,
        damage: newWeapon.damage,
      }));
    }
  }, [player1.x, player1.y]);

  useEffect(() => {
    socket.emit("opponentLife", {
      life: player1Hud.life,
      opponentId: opponentId,
    });
  }, [player1Hud.life]);

  const handleMouseClick = () => {
    if (canHit(player1.x, player1.y, player2.x, player2.y, player1.side)) {
      // console.log('Hit: ');

      socket.emit("hit", {
        damage: player1Hud.damage,
        opponentId: opponentId,
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.code) {
      case "KeyA":
      case "ArrowLeft":
        player1.moveLeft();
        break;
      case "KeyW":
      case "ArrowUp":
        player1.moveUp();
        break;
      case "KeyD":
      case "ArrowRight":
        player1.moveRight();
        break;
      case "KeyS":
      case "ArrowDown":
        player1.moveDown();
        break;
    }
  };
  return (
    <S.Container
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={handleMouseClick}
    >
      <S.Map>
        <Character
          x={player1.x}
          y={player1.y}
          side={player1.side}
          name={player1.name}
          weapon={player1Hud.weaponImage}
        />
        <Character
          x={player2.x}
          y={player2.y}
          side={player2.side}
          name={player2.name}
        />
      </S.Map>

      <Hud
        endGame={endGame}
        life={player1Hud.life}
        weapon={player1Hud.weapon}
        strengh={player1Hud.damage}
        opponentsLife={player2.life}
      />
      {WeaponsList.map((weapon, index) => (
        <S.Weapon
          top={weapon.defaultPosition.y}
          left={weapon.defaultPosition.x}
          src={weapon.image}
          key={index}
        />
      ))}
    </S.Container>
  );
};
