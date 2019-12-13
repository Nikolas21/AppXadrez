const models = require('../models/index');
const Partida = models.partida;
const Usuario = models.usuario;


const update = async (value, params) => {
    try {
        console.log(value, params, "estou enviando para o banco");
        await Partida.update(value,
            { where: { id: params } })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

const create = async (req, res) => {
    const Userid = req.session.uid.id;
    try {
        value = {
            user_id_1: Userid,
            fen: 'start'
        }
        await Partida.create(value)
        res.redirect('/partida')
    } catch (error) {
        console.log(error)
    }
}



const partida = async (req, res) => {
    const session = req.session;

    const Userid = req.session.uid.id;
    console.log("Userid", req.session.uid.id)
    console.log("id passado", req.params.id)
    if (req.params.id) {

        try {
           const partida = await Partida.findByPk(req.params.id, { include: [{ model: Usuario, as: 'user1' }, { model: Usuario, as: 'user2' }] })
           
            console.log("testando acessar partido por id", partida);


            if (partida.user1.id == Userid) {
                res.render('partida/game', {
                    csrf: req.csrfToken(),
                    partida: 'board-' + partida.id,
                    roomId: partida.id,
                    idUser: Userid,
                    idOp: partida.user2 ? partida.user2.id : '',
                    fen: partida.fen,
                    color: 'white',
                    sessionName: session ? session.uid : undefined,
                    layout: 'main'
                });
            } else {
                res.render('partida/game', {
                    csrf: req.csrfToken(),
                    partida: 'board-' + partida.id,
                    roomId: partida.id,
                    idUser: partida.user1.id,
                    idOp: Userid,
                    fen: partida.fen,
                    color: 'black',
                    sessionName: session ? session.uid : undefined,
                    layout: 'main'
                });

            }

        } catch (error) {
            console.log(error)
            //res.redirect('/');
        };

    } else {
        try {

            tamanho = await Partida.findAll();
            res.render('partida/game', {
                csrf: req.csrfToken(),
                partida: 'board-' + tamanho.length,
                roomId: tamanho.length,
                idUser: Userid,
                idOp:'' ,
                fen: 'start',
                color: 'white',
                sessionName: session ? session.uid : undefined,
                layout: 'main'
            });


            console.log(tamanho.length, "resultado do filtro")
        } catch (e) { console.log(e) }

       
    }


};

const ranking = async (req, res) => {
    const session = req.session;
    try{

    }catch(e){
	console.log(e);
    }		
    const partida = await Partida.findAll()
    res.render('partida/ranking', {
        csrf: req.csrfToken(),
        partidas: partida,
        sessionName: session ? session.uid : undefined,
        layout: 'main'
    });
};

module.exports = { partida, ranking, update, create }
