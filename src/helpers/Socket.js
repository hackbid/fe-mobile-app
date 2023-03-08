import { io } from 'socket.io-client';
const socket = io.connect('https://api.hackbid.com');

socket.on('connect', () => {
    console.log(`conected with id: ${socket.id}`);
});

socket.on('disconnect', () => {
    console.log('disconnected'); // undefined
});

export default socket;
