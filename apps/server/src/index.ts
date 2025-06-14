import http from 'http';
import SocketService from './services/socket.js';

async function init() {

    const socketService = new SocketService();


    const httpServer = http.createServer();
    const PORT = process.env.PORT || 8000;

    socketService.server.attach(httpServer);

    httpServer.listen(PORT, () => {
        console.log(`HTTP Server started at PORT: ${PORT}`);
    })


    socketService.eventListener();


}


init()