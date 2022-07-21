import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import * as S from "./styles";

import { SocketContext } from "../../services/socket";

// import {
//   createUserWithEmailAndPassword,
//   getAuth,
//   signInWithEmailAndPassword,
//   signOut,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";

// import { app } from "../../services/firebase-config";

export default function Login() {
  const socket = useContext(SocketContext);
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function connect() {
    socket.emit("select_room", {
      client_id: socket.id,
      username,
      email,
      password,
    });
    navigate("/lobby?username=" + username);
  }

  return (
    <>
      <S.Container>
        <S.Form>
          <h2>Battle Arena</h2>
          <input
            type="text"
            name="username"
            placeholder="Name..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password..."
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email..."
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <button
            onClick={() => {
              connect();
              // register();
              // login();
            }}
          >
            Entrar
          </button>
        </S.Form>
      </S.Container>
    </>
  );
}
