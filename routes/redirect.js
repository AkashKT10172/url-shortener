const router = require('express').Router();
const URL = require('../models/url')

router.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    // console.log('shortId = ', shortId);
    // Find the URL document and update visit history
    const entry = await URL.findOneAndUpdate(
        { shortId }, // Query by shortId
        { 
            $push: { visitHistory: { timestamp: Date.now() } } 
        },
    );
    if (!entry) {
        // console.log('Short URL not found:', shortId);
        return res.status(404).json({ error: 'Short URL not found' });
    }
    res.redirect(entry.redirectURL)
})

module.exports = router;