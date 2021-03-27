const express = require('express')
const bbcCtrl = require('../controller/bbcController');

const router = express.Router();

router.route('/')
    .get(bbcCtrl.get)
    .post(bbcCtrl.scrapeRecipe);

module.exports = router;