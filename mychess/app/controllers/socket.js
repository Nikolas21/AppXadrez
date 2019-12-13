
const Partida = require('../controllers/partida');

module.exports = io => {

    var players;
    var p1 = 1;
    var p2 = 2;

    // create an array of 100 games and initialize them
    var games = Array(100);
    for (let i = 1; i <= 100; i++) {
        games[i] = { players: 0, pid: [0, '0'] };
    }

    io.on('connection', function (socket) {

        var roomId
        var playerId
        var idUser
        var idOp
        console.log("Usuario Conectado");

        var color; // black or white
        
        

        socket.on('joined', function (msg) {

            console.log('cheguei no joined')
            roomId = msg.roomId;

            if (msg.color == 'white') {
                if (msg.idUser) {
                    console.log('estou iduser')
                    idUser = msg.idUser;
                    playerId = idUser;
                    games[roomId].players = 1;
                    games[roomId].pid[0] = playerId;
                }
            } else {
                if (msg.idOp !== '') {
                    console.log('estou idOp')
                    idOp = msg.idOp;
                    playerId = idOp;
                    games[roomId].players = 1;
                    games[roomId].pid[1] = playerId;
                }
            }
            if (games[roomId].pid[0] != 0 && games[roomId].pid[1] != 0) {
                games[roomId].players = 2;
                if (msg.color == 'white') {
                    body = {
                        user_id_1: games[roomId].pid[0],
                        user_id_2: games[roomId].pid[1],
                        fen: msg.fen
                    };
                    id = msg.roomId 
                    Partida.update(body,id);
                   
                } else {
                    body = {
                        user_id_1: games[roomId].pid[0],
                        user_id_2: games[roomId].pid[1],
                        fen: msg.fen
                    };
                    id = msg.roomId 
                    Partida.update(body,id);

                }

            }

            console.log(games[roomId]);
            players = games[roomId].players
            color = msg.color;
          
            console.log("quantidade de jogadores", players)
            console.log("nome jogadores", playerId)
            
            socket.emit('player', { playerId, players, color, roomId })

        });

        
        socket.on('move', function (msg) {
            const body = {fen: msg.board};
            const id = msg.room;
            console.log("cheguei no move", msg.board)
            Partida.update(body,id);
        
            socket.broadcast.emit('move', msg);
            
        });

       
        socket.on('play', function (msg) {
            socket.broadcast.emit('play', msg);
            console.log("ready " + msg);
        });

       
        socket.on('disconnect', function () {
            for (let i = 1; i <= 100; i++) {
                if (games[i].pid[0] == playerId || games[i].pid[1] == playerId) {
                    games[i].players = 0;
                    games[i].pid[0] = 0;
                    games[i].pid[1] = 0;
                }

            }
            console.log(playerId + ' disconnected');

        });
    });




}