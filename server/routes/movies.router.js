const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "movies" ORDER BY "id" ASC;`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch((err) => {
            res.sendStatus(500)
            console.log(err);
        })
})

router.get('/details/:id', (req, res) => {
    const queryText = `SELECT * FROM "movies" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        }).catch((err) => {
            res.sendStatus(500)
            console.log(err);
        })
})

router.put('/', (req,res)=>{
    console.log(req.body);
    const queryText = `UPDATE "movies" SET "title" = $1 , "description" = $2 WHERE "id" = $3;`;
    pool.query(queryText,[req.body.title,req.body.description,req.body.id])
    .then((result)=>{
        res.sendStatus(200);
    }).catch((err)=>{
        res.sendStatus(500);
    })
})


module.exports = router;
