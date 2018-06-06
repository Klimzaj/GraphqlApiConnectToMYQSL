import connection from '../config'
import { graphql, buildSchema } from 'graphql'

const {swordsSchema, swordsQuery} = require('../schemas/swords')(buildSchema);
const {shieldsSchema, shieldsQuery} = require('../schemas/shields')(buildSchema);
const {playerSchema, playerQuery} = require('../schemas/player')(buildSchema);

module.exports = {
    allSwords: (req, res) => {
        connection.query('SELECT * from sword', async (err, rows) => {
            if (!err) {
                const response = await graphql(swordsSchema, swordsQuery, {swords: rows});
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
    allShields: (req, res) => {
        connection.query('SELECT * from shield', async (err, rows) => {
            if (!err) {
                const response = await graphql(shieldsSchema, shieldsQuery, {shields: rows});
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

    createShield: (req, res, next) => {
        let response;
        const name = req.body.name;
        const d = req.body.d;
        const cost = req.body.cost;
        const it = req.body.it;
        if (
            typeof name !== 'undefined'
            && typeof d !== 'undefined'
            && typeof cost !== 'undefined'
            && typeof it !== 'undefined'
        ) {
            var date_id;
            connection.query('INSERT INTO detail_date VALUES ()', [], async (err, result) => {
                date_id = await result.insertId;
                connection.query('INSERT INTO ? (name,dmg,cost) VALUES(?,?,?)', [it,name,d,cost], (err, result) => {cosnole.log('error!shop')});
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