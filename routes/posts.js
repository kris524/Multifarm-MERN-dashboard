const express = require('express');
const router = express.Router();
const Posts = require('../models/Post');


var xData = require('./dates_generator')
var yData = require('./yData')
// console.log(xData)
// console.log(yData)
// Gets back all the data
// router.get('/', async (req, res) => {

//     try {
//         const posts = await Posts.find();
//         res.json(posts);
//     } catch (err) {
//         res.json(err)
//     }
// });
// router.get('/', (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// })


 

// Submits the data
// router.post('/', (req, res) => {
//     for (let i = 0; i < xData.length; i++) {
//         const post = new Posts({

//             date: xData[i],
//             datapoint: yData[i]

//         });

//         post.save();
//     }
// });



// Specific data
router.get('/:postId', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.postId);
        res.json(post)
    } catch (err) {
        res.json(err)
    }
})



// Delete data
router.delete("/:postId/", async (req, res) => {
    try {
        const removeData = await Posts.remove({ _id: req.params.postId })
        res.json(removeData)
    }
    catch (err) {
        res.json(err)
    }

})

// Update data
router.patch("/:postId/", async (req, res) => {
    try {

        const updatedData = await Posts.updateOne(
            { _id: req.params.postId },
            { $set: { date: req.body.date, datapoint: req.body.datapoint } },
        )

        res.json(updatedData)
    } catch (err) {
        res.json(err)
    }
})


module.exports = router