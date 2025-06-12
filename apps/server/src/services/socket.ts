
import { Server } from 'socket.io';

class SocketService {
    private _server: Server;

    constructor() {
        console.log(`Socket service created`);
        
        this._server = new Server({
            cors: {
                origin: 'http://localhost:3000',
                methods: ['GET', 'POST'],
            },
        });
    }
    public eventListener() {
        console.log('Event listener called');

        this._server.on('connect', (socket) => {
            console.log('Socket connected', socket.id);

            socket.on('event:message', async({message}:{message:string}) => {
                console.log('Message received', message);
                socket.emit('event:message', {message:'Hello'});

            });

            socket.on('disconnect', () => {
                console.log('Socket disconnected');
            });
        });
    }

    get server() {
        return this._server;
    }


    // public onConnection(socket: Socket) {
    //     console.log('Socket connected');
    //     socket.on('disconnect', () => {
    //         console.log('Socket disconnected');
    //     });
    // }
}

export default SocketService;