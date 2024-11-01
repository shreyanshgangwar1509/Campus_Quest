import express from 'express';
const router = express.Router();

router.post("/createHunt", createHunt); //testing Done

router.get('/hunts', allhunts);

router.get('hunts/:huntId', huntinfo);

router.post('/hunts/:huntId/takepart', takePartInHunt);


