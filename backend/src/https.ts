import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './types';

const app = express();

const httpServer = http.createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
    cors: {
      origin: "http://localhost:3000"
    }
  });
export { httpServer, io };

