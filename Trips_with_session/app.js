const express = require('express')
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const path = require('path')
const app = express()

let trips = []

// Setting up the session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

let users = [
    {
        username: "johndoe",
        password: "password",
        trips: [{
            title: "Houston",
            image: "image",
            departureDate: "a date",
            returnDate: "another date",
            tripID: "abcdef"
        }],
    },
    {
        username: "marydoe",
        password: "password",
        trips: [{
            title: "Houston",
            image: "image",
            departureDate: "a date",
            returnDate: "another date",
            tripID: "bvheafj"
        }]
    }
]

let persistedUser = {}

app.engine('mustache', mustacheExpress())

//  below sets the page and the folder
app.set('views', './views')

app.set('view-engine', 'mustache')

app.use(bodyParser.urlencoded({ extended: false }))

// get the path to the views folder
const VIEWS_PATH = path.join(__dirname, '/views')

// telling mustache where to find partial pages
app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))



app.get('/show-tripz', (req, res) => {
    res.render('index.mustache', { tripsList: persistedUser.trips })
})
app.get('/', (req, res) => {
    res.render('login.mustache')
})

app.post('/login', (req, res) => {
    let username = req.body.username
    let password = req.body.password

    persistedUser = users.find((user) => {
        return user.username == username && user.password == password
    })

    if (persistedUser) {
        // save username to the session
        if (req.session) {
            req.session.username = persistedUser.username

            res.redirect('/show-tripz')
        }
        else {
            res.render('login.mustache', { message: "Invalid user credentials.  Please login again or register a new account" })
        }
    }
})

app.get('/add-trip', (req, res) => {
    res.render('add-trip.mustache')
})

app.post('/add-trip', (req, res) => {
    let title = req.body.title
    let image = req.body.image
    let departureDate = req.body.departureDate
    let returnDate = req.body.returnDate
    let trip = new Trip(title, image, departureDate, returnDate)
    persistedUser.trips.push(trip)
    // trips.push(trip)

    res.redirect('/show-tripz')
})

app.get('/register', (req, res) => {
    console.log("ok")
    res.render('register.mustache')
})

app.post('/register', (req, res) => {
    console.log("ok")
    let username = req.body.username
    let password = req.body.password
    let newUser = { username: username, password: password, trips: [] }
    users.push(newUser)
    persistedUser = users.find((user) => {
        return user.username == username && user.password == password
    })

    res.render('index.mustache', { tripsList: persistedUser.trips })
    console.log(users)
})

app.post('/delete', (req, res) => {
    let deleteID = req.body.tripID
    console.log(deleteID)

    persistedUser.trips = persistedUser.trips.filter(function (trip) {
        console.log(trip.tripID)
        return trip.tripID != deleteID
    })
    console.log(trips)
    res.redirect('/show-tripz')
})

//logout
app.post('/logout', (req, res) => {
    req.session.destroy()
    console.log("route working")
    res.render('login.mustache')
})
// req.session.destroy()

app.listen(3000, function () {
    console.log("The server is listening... ")
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
