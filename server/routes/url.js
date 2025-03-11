const router = require('express').Router();
const shortId = require('shortid');
const URL = require('../models/url')

router.post('/', async (req, res) => {
    const body = req.body;
    if(!body.url)
        return res.status(401).json({error : 'url is required'});

    const shortID = shortId();
    await URL.create({
        shortId : shortID,
        redirectURL : body.url,
        visitHistory : []
    })
    return res.json({id : shortID});
})

module.exports = router;