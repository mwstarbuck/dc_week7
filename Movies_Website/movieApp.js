const express = require('express')
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const uuid = require('uuid/v1')
const path = require('path')

//  === TODO ======
const movieRoutes = require('./routes/movies.js')


const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
//  ====== TODO ============
// registering express routing
app.use('/movies', movieRoutes)
// app.use('/users', userRoutes)

app.use('/css/', express.static('css')) // localhost:3000/site.css

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// get the path to the views folder
const VIEWS_PATH = path.join(__dirname, '/views')

// telling mustache where to find partial pages
app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))

// the pages are located in views directory
app.set('views', './views')
// extension will be .mustache
app.set('view engine', 'mustache')

// app.get('/', (req, res) => {
//     res.render('index')
// })


app.listen(3000, () => {
    console.log("Server is running... ")
})