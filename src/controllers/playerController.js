import connection from '../config'
import { graphql, buildSchema } from 'graphql'

const {playersSchema, playersQuery} = require('../schemas/players')(buildSchema);
const {playerSchema, playerQuery} = require('../schemas/player')(buildSchema);

module.exports = {
    all: (req, res) => {
        connection.query('SELECT * from player', async (err, rows) => {
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
        connection.query('SELECT * from player where idp = ?', [req.params.id], async (err, rows) => {
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
            var date_id;
            var player_id;
            connection.query('INSERT INTO detail_date VALUES ()',
                [],
                async (err, result) => {
                    date_id = await result.insertId;
                    connection.query('INSERT INTO player (login,password) VALUES(?,?)',
                        [login,password],
                        async (err, result) => {
                            player_id = await result.insertId;
                            connection.query('INSERT INTO detail_player (p_id,date_id) VALUES(?,?)',
                                [player_id,date_id],
                                (err, result) => {
                                    handleSuccessOrErrorMessage(err, result, res);
                            });
                            // console.log(date_id);
                            // handleSuccessOrErrorMessage(err, result, res);
                        });
                    // console.log(result.insertId);
                    // date_id = takeID(err, result, res);
                    // handleSuccessOrErrorMessage(err, result, res);
                    // console.log(date_id);
                });
            // console.log(date_id);
            // connection.query('INSERT INTO player (login,password) VALUES(?,?)',
            //     [login,'68656c6c6f'],
            //     (err, result) => {
            //         player_id = result.insertId;
            //         handleSuccessOrErrorMessage(err, result, res);
            //     });
            //     console.log(data_id)
            //     console.log(player_id)
            // connection.query('INSERT INTO detail_player (p_id,date_id) VALUES(?,?)',
            //     [player_id,date_id],
            //     (err, result) => {
            //         handleSuccessOrErrorMessage(err, result, res);
            //     });

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