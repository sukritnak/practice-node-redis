const express = require('express')
const axios = require('axios')
const redis = require('redis')
const app = express()

const redisClient = redis.createClient();
// default port 6379

app.get('/', (req, res) => {
    const username = req.query.username || 'sukritnak'
    const url = `https://api.github.com/users/${username}`

    redisClient.get(username, async (err, reply) => {
        if (reply) {
            console.log('Have cache')
            return res.json(JSON.parse(reply))
        }
        const response = await axios.get(url)
        redisClient.setex(username, 60, JSON.stringify(response.data))
        return res.json(response.data)
    })

})

app.listen(9000, () => {
    console.log('App is running on port 9000')
})
