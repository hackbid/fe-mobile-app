import { io } from 'socket.io-client';
const socket = io.connect('http://192.168.1.5:4000');

socket.on('connect', () => {
    console.log(`conected with id: ${socket.id}`);
});

socket.on('disconnect', () => {
    console.log('disconnected'); // undefined
});

export default socket;
