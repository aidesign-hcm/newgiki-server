  
const express = require("express");
const router = express.Router();
const algoliasearch = require("algoliasearch");


const client = algoliasearch(
    process.env.ALGOLIA_APP_ID, 
    process.env.ALGOLIA_SECRET
    );
const index = client.initIndex(process.env.ALGOLIA_APP_INDEX);

router.post('/', async (req,res) => {
    try {
        let result = await index.search(req.body.name)
        res.json(result.hits)
    } catch(err){
        res.json(err.message)
    }
})

module.exports = router;