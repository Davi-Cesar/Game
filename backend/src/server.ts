import { httpServer } from "./https";
import "./websocket";

const PORT = process.env.PORT || 8800

httpServer.listen(PORT, () => {
    console.log("Server started at " + `${PORT}`);
});

