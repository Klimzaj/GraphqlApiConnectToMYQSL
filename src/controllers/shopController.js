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

    create: (req, res, next) => {
        let response;
        const name = req.body.name;
        const dval = req.body.dval;
        const cost = req.body.cost;
        const it = req.body.it;
        const d = req.body.d;

        if (
            typeof name !== 'undefined'
            && typeof dval !== 'undefined'
            && typeof cost !== 'undefined'
            && typeof it !== 'undefined'
            && typeof d !== 'undefined'
        ) {
            var date_id;
            connection.query('INSERT INTO detail_date VALUES ()', [], async (err, result) => {
                date_id = await result.insertId;
                // console.log(`INSERT INTO ${it} (name,cost,def,date_id) VALUES (${name,cost,d,date_id})`)
                connection.query(`INSERT INTO ${it} (name,cost,${d},date_id) VALUES(?,?,?,?)`,
                [name,Number(cost),Number(dval),date_id], 
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
    }
    
};

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