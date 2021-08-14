const express = require('express')
const axios = require('axios')
const app = express()
const redis = require('redis')
// app.get((req, res) => {
//     res.json({
//         message: 'OK'
//     })
// })

app.get('/', async (req, res) => {
    const username = req.query.username || 'sukritnak'
    const url = `https://api.github.com/users/${username}`
    const response = await axios.get(url)
    res.json(response.data)
})

app.listen(9000, () => {
    console.log('App is running on port 9000')
})
