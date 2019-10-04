const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
    const querText = `SELECT * FROM "movies";`;
    pool.query(querText)
        .then((result) => {
            res.send(result.rows);
        }).catch((err) => {
            console.log(err);
        })
})

router.get('/details/:id', (req, res) => {
    const querText = `SELECT * FROM "movies" WHERE "id" = $1;`;
    pool.query(querText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        }).catch((err) => {
            console.log(err);
        })
})


module.exports = router;
