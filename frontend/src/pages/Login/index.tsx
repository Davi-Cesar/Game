import { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import * as S from "./styles";

import { SocketContext } from "../../services/socket";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app } from "../../services/firebase-config";

export default function Login() {
  const socket = useContext(SocketContext);
  const auth = getAuth(app);
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

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <>
      <form>
        <input
          type="text"
          name="username"
          placeholder="Name..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="text"
          name="password"
          placeholder="Password..."
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input
          type="text"
          name="email"
          placeholder="Email..."
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        {/* <Link to="/lobby"> */}
        <button
          type="submit"
          onClick={() => {
            connect();
            // register();
            // login();
          }}
        >
          Entrar
        </button>
        {/* </Link> */}
      </form>
    </>
  );
}
