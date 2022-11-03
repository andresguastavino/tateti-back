const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
	cors: {
		origin: 'http://localhost:3000'
	}
});

const { initGame } = require('./lib/game_manager/game_manager');

let queue = [];
let usersInQueue = [];
let usersConnected = [];
let roomByUsername = {};
let gameDataByRoom = {};

io.on('connection', socket => {
	const { socketId } = socket;

	socket.on('identify', (username) => {
		if(usersConnected.includes(username)) {
			// socket.disconnect();
			return;
		}

		usersConnected.push(username);
	});

	socket.on('join_queue', (username) => {
		queue.push({ username, socket, socketId });
		usersInQueue.push(username);

		socket.emit('message', 'You have joined the queue. We are now searching for a game room');

		while(queue.length >= 2) {
			let user1 = queue.shift();
			let user2 = queue.shift();

			let room_name = `${user1.username}-${user2.username}`;

			user1.socket.join(room_name);
			user1.socket.emit('message', `You have joined room "${ room_name }"`);
			roomByUsername[user1.username] = room_name;

			user2.socket.join(room_name);
			user2.socket.emit('message', `You have joined room "${ room_name }"`);
			roomByUsername[user2.username] = room_name;

			io.to(room_name).emit('message', 'Both players ready. Game starting in 10!');
			setTimeout(() => {
				const gameData = initGame(user1, user2);
				gameDataByRoom[room_name] = gameData;
				io.to(room_name).emit('message', JSON.stringify({ gameData }));
			}, 10000);
		}
	});



	socket.on('join_game', (userData) => {
		const room_name = 'game_room';
		socket.join(room_name);
		socket.emit('message', `you joined ${ room_name }`);
		
		userData.starts = false;
		gameData.users.push(userData);
		if(gameData.users.length === 2) {
			gameData.isGameReady = true;
			io.to(room_name).emit('game_update', { ...gameData, message: 'Game starts in 10!' });

			const randomNumb = Math.floor(Math.random() * 2);
			gameData.users[randomNumb].starts = true;
			setTimeout(() => {
				gameData.gameStarted = true;
				io.to(room_name).emit('game_update', { ...gameData, message: 'Game just started!' });
			}, 10000);
		};
	});

	// player move should only receive the marked cell
	socket.on('player_move', ({ gameData }) => {

	});
});

const PORT = 3001 || process.env.PORT;

server.listen(PORT, () => {
	console.log(`Server running on port: ${ PORT }`);
});