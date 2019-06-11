import * as express from 'express';

import db from './db';

const router = express.Router();

//takes a user id and returns the user name
router.get('/api/name/:id', async (req, res) => {
    try {
        res.json((await db.Name.getMentName(req.params.id))[0])
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// different way to destructure the route.
// router.get('/api/name/:id', async (req, res) => {
//     try {
//         let [name] = await db.Name.getMentName(req.params.id);
//         res.json(name)
//     } catch (err) {
//         console.log(err);
//         res.sendStatus(500);
//     }
// })

// gets all users id and name
router.get('/api/users', async (req, res) => {
    try {
        res.json(await db.Users.allUserNames())
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// takes a user name and returns the user id
router.get('/api/users/:name', async (req, res) => {
    try {
        res.json((await db.Users.userName(req.params.name))[0])
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// takes user id and returns chirpid, userid(person who chirped), text and _created
router.get('/api/mentions/:userid', async (req, res) => {
    try {
        res.json((await db.Mentions.getAllMentions(req.params.userid))[0])
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// takes userid(person mentioned) and chirpid and inserts new mention into db.mention
router.post('/api/mentions', async (req, res) => {
    try {
        let newMention = await db.Mentions.createMention(req.body.userid, req.body.chirpid);
        res.json(newMention)
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// gets all chirps or a chirp by the chirp id
router.get('/api/chirps/:id?', async (req, res) => {
    let id = req.params.id
    if (id) {
        try {
            res.json((await db.Chirps.one(id))[0]);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    } else {
        try {
            res.json(await db.Chirps.all())
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
});

// takes userid(person chirping) and text and inserts new chirp into db.chirps
router.post('/api/chirps', async (req, res) => {
    try {
        let newChirp = await db.Chirps.createChirp(req.body.userid, req.body.text);
        res.json(newChirp);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// takes chirpid and  text and edits existing chirp
router.put('/api/chirps/:id', async (req, res) => {
    try {
        res.json(await db.Chirps.updateChirp(req.body.text, req.params.id));

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// takes chirpid and delets that text
router.delete('/api/chirps/:id', async (req, res) => {
    try {
        res.json(await db.Chirps.deleteChirp(req.params.id));
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})


export default router;