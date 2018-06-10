import connection from '../config'
import { graphql, buildSchema } from 'graphql'

const {playersSchema, playersQuery} = require('../schemas/players')(buildSchema);
const {playersIdSchema, playersIdQuery} = require('../schemas/playersId')(buildSchema);
const {playerSchema, playerQuery} = require('../schemas/player')(buildSchema);
const {playersInfoSchema, playersInfoQuery} = require('../schemas/playersInfo')(buildSchema);
const {idInfoSchema, idInfoQuery} = require('../schemas/idInfo')(buildSchema);
const {countSchema, countQuery} = require('../schemas/count')(buildSchema);

module.exports = {

    updateCoins: (req, res) => {
        let response;
        const p_id = req.body.p_id;
        const coin = req.body.coin;
        if (
            typeof p_id !== 'undefined'
            && typeof coin !== 'undefined'
        ) {
            connection.query('update detail_player set coin = ? where p_id = ?',
                [coin, p_id],
                function(err, result) {
                    handleSuccessOrErrorMessage(err, result, res);
                });
        } else {
            response = {'result' : name, 'msg' : 'Please fill required information'};
            res.setHeader('Content-Type', 'application/json');
            res.send(200, JSON.stringify(response));
        }
    },

    allId: (req, res) => {
        connection.query('select * from detail_player inner join player on p_id=idp inner join detail_date on date_id=iddate where is_delete=false', async (err, rows) => {
            if (!err) {
                const response = await graphql(playersIdSchema, playersIdQuery, {playersId: rows});
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(
                    {
                        'result' : 'success',
                        'data': response.data.playersId
                    })
                );
            } else {
                res.status(400).send(err);
            }
        });
    },

    winCount: (req, res) => {
        connection.query('select count(*) as ej from game where p1_id = ? and p1_win = 1',
        [req.params.id],
        async (err, rows) => {
            if (!err) {
                const response = await graphql(countSchema, countQuery, {counter: rows});
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(
                    {
                        'result' : 'success',
                        'data': response.data.counter
                    })
                );
            } else {
                res.status(400).send(err);
            }
        });
    },
    allCount: (req, res) => {
        connection.query('select count(*) as ej from game where p1_id = ?',
        [req.params.id], 
        async (err, rows) => {
            if (!err) {
                const response = await graphql(countSchema, countQuery, {counter: rows});
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(
                    {
                        'result' : 'success',
                        'data': response.data.counter
                    })
                );
            } else {
                res.status(400).send(err);
            }
        });
    },
    play: (req, res, next) => {
        let response;
        const id = req.body.id;
        const win = req.body.win;
        var date_id;
        if (
            typeof id !== 'undefined'
            && typeof win !== 'undefined'
        ) {
            connection.query('INSERT INTO detail_date VALUES ()', [], async (err, result) => {
                date_id = await result.insertId;
                connection.query(`INSERT INTO game (p1_id,p1_win,date_id) VALUES(?,?,?)`,
                [id,win,date_id], 
                (err, result) => {
                    handleSuccessOrErrorMessage(err, result, res);
                });
            });            

        } else {
            response = {
                'result' : 'error',
                'msg' : 'Please fill required details'
            };
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
        }
    },


    //deleteplayer: update detail_player inner join detail_date on detail_player.date_id=iddate set is_delete = 1, date_delete = (now()) where p_id = ?;
    deleteplayer: (req, res) => {
        let response;
        const id = req.body.id;
        // console.log(id)
        if (
            typeof id !== 'undefined'
        ) {
            connection.query('update detail_player inner join detail_date on detail_player.date_id=iddate set is_delete = 1, date_delete = (now()) where p_id = ?',
                [id],
                function(err, result) {
                    // console.log('edit')
                    handleSuccessOrErrorMessage(err, result, res);
                });
        } else {
            response = {'result' : name, 'msg' : 'Please fill required information'};
            res.setHeader('Content-Type', 'application/json');
            res.send(200, JSON.stringify(response));
        }
    },

    // select p_id,date_creselect p_id,date_create,is_delete,date_delete from detail_player inner join detail_date on detail_player.date_id=iddate where is_delete=false;


    // idInfo: select sword.name as swordName ,dmg,shield.name as shieldName,def,date_create as date from detail_player inner join player on p_id=idp inner join shield on sh_id=idsh inner join sword on sw_id=idsw inner join detail_date on detail_player.date_id=iddate where is_delete=false and idp = ;
    idInfo: (req, res) => {
        connection.query('select sword.name as swordName ,dmg,shield.name as shieldName,def,date_create as date from detail_player inner join player on p_id=idp inner join shield on sh_id=idsh inner join sword on sw_id=idsw inner join detail_date on detail_player.date_id=iddate where is_delete=false and idp = ?',
        // connection.query('select idp,sword.name as swordName ,dmg,shield.name as shieldName,def,date_create as date from detail_player inner join player on p_id=idp inner join shield on sh_id=idsh inner join sword on sw_id=idsw inner join detail_date on detail_player.date_id=iddate where is_delete=false and idp = ?',
        [req.params.id],
        async (err, rows) => {
            if (!err) {
                const response = await graphql(idInfoSchema, idInfoQuery, {idInfo: rows});
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(
                    {
                        'result' : 'success',
                        'data': response.data
                    })
                );
                // await console.log(response.data)
            } else {
                res.status(400).send(err);
            }
        });
    },


    // allInfo: select * from detail_player inner join player on p_id=idp inner join shield on sh_id=idsh inner join sword on sw_id=idsw inner join detail_date on detail_player.date_id=iddate where is_delete=false;
    allInfo: (req, res) => {
        connection.query('select * from detail_player inner join detail_date on date_id=iddate inner join player on p_id=idp where is_delete = false', async (err, rows) => {
            if (!err) {
                const response = await graphql(playersInfoSchema, playersInfoQuery, {playersInfo: rows});
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(
                    {
                        'result' : 'success',
                        'data': response.data
                    })
                );
                // await console.log(response.data)
            } else {
                res.status(400).send(err);
            }
        });
    },

    all: (req, res) => {
        connection.query('select * from detail_player inner join player on p_id=idp inner join detail_date on date_id=iddate where is_delete=false', async (err, rows) => {
            if (!err) {
                const response = await graphql(playersSchema, playersQuery, {players: rows});
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(
                    {
                        'result' : 'success',
                        'data': response.data
                    })
                );
            } else {
                res.status(400).send(err);
            }
        });
    },
    get: (req, res) => {
        connection.query('select * from detail_player inner join player on p_id=idp where idp = ?', [req.params.id], async (err, rows) => {
            const response = await graphql(playerSchema, playerQuery, {player: rows});
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(
                {   
                    'result' : 'success',
                    'data': response.data
                })
            );
        })
    },
    isLogin: (req, res) => {
        connection.query('SELECT * from player where login = ?', [req.params.log], async (err, rows) => {
            const response = await graphql(playerSchema, playerQuery, {player: rows});
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(
                {
                    'result' : 'success',
                    'data': response.data
                })
            );
        })
    },
    create: (req, res, next) => {
        let response;
        const login = req.body.login;
        const password = req.body.password;
        if (
            typeof login !== 'undefined'
            && typeof password !== 'undefined'
        ) {
            var date_id1;
            var date_id2;
            var date_id3;
            var player_id;
            connection.query('INSERT INTO detail_date VALUES ()',
                [],
                async (err, result) => {
                    date_id1 = await result.insertId;
                    connection.query('INSERT INTO player (login,password) VALUES(?,?)',
                        [login,password],
                        async (err, result) => {
                            player_id = await result.insertId;
                            connection.query('INSERT INTO detail_player (p_id,date_id,sw_id,sh_id) VALUES(?,?,1,1)',
                                [player_id,date_id1],
                                async (err, result) => {
                                    connection.query('INSERT INTO detail_date VALUES ()',
                                    [],
                                    async (err, result) => {
                                        date_id2 = await result.insertId;
                                        connection.query(`INSERT INTO shop (p_id,sw_id,date_id) VALUES(?,1,?)`,
                                        [player_id,date_id2],
                                        async (err, result) => {
                                            connection.query('INSERT INTO detail_date VALUES ()',
                                            [],
                                            async (err, result) => {
                                                date_id3 = await result.insertId;
                                                connection.query(`INSERT INTO shop (p_id,sh_id,date_id) VALUES(?,1,?)`,
                                                [player_id,date_id3],
                                                async (err, result) => {
                                                    handleSuccessOrErrorMessage(err, result, res);
                                            });
                                         });
                                    });
                                });
                            });
                        });
                    });
        } else {
            response = {
                'result' : 'error',
                'msg' : 'Please fill required details'
            };
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
        }
    }
};
function takeID(err,result,res) {
    if (!err){
        return result.insertId;
    } else {
        res.status(400).send(err);
    }
}

function handleSuccessOrErrorMessage(err, result, res) {
    if (!err){
        let response;
        if (result.affectedRows != 0) {
            response = {'result' : 'success'};
        } else {
            response = {'msg' : 'No Result Found'};
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(response));
    } else {
        res.status(400).send(err);
    }
}