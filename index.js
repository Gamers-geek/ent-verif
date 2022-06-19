const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const pronote = require('@dorian-eydoux/pronote-api')

// Middleware
app.use(express.json())

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})

app.get('/', (req, res) => res.send('Working!!!'));

app.post('/verifyEnt', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    return res.send(req.body)

    /*const data = {
        user: "LOGAN Clément",
        class: 216,
        establishment: {
            name: "LYCEE GENERAL ET TECHNOLOGIQUE LYCEE ROSA PARKS",
        }
    }

    return res.status(200).json(data)*/

    /*pronote.login("https://0910625k.index-education.net/pronote/", username, password, "iledefrance")
        .then(session => {
            const data = {
                user: session.user.name,
                class: session.user.studentClass.name,
                establishment: session.user.establishment
            }
            session.logout()
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(501).json(err)
        })*/
})

app.get("/verifyEnt", (req, res) => {
    const username = req.query.username
    const password = req.query.password

    return res.send(req.query)
})