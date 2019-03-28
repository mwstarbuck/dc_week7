const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
let trips = []
app.use(bodyParser.urlencoded({ extended: false }))

app.engine('mustache', mustacheExpress())

//  below sets the page and the folder
app.set('views', './views')

app.set('view-engine', 'mustache')

app.get('/', (req, res) => {
    res.render('index.mustache', { tripsList: trips })
})

app.get('/add-trip', (req, res) => {
    res.render('add-trip.mustache')
})

app.post('/', (req, res) => {
    let title = req.body.title
    let image = req.body.image
    let departureDate = req.body.departureDate
    let returnDate = req.body.returnDate
    let trip = new Trip(title, image, departureDate, returnDate)
    trips.push(trip)

    res.redirect('/')
})


class Trip {
    constructor(title, image, departureDate, returnDate) {
        this.title = title
        this.image = image
        this.departureDate = departureDate
        this.returnDate = returnDate
        this.tripID = this.guid()

    }
    guid(length) {
        if (!length) {
            length = 8
        }
        var str = ''
        for (var i = 1; i < length + 1; i = i + 8) {
            str += Math.random().toString(36).substr(2, 10)
        }
        return ('_' + str).substr(0, length)
    }
}

app.post('/delete', (req, res) => {
    let deleteID = req.body.tripID
    trips = trips.filter(trip => trip.tripID != deleteID)
    res.redirect('/')
})

app.listen(3000, function () {
    console.log("The server is listening... ")
})

