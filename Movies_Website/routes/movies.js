const express = require('express')
const router = express.Router()
const uuid = require('uuid')

let movies = []
router.get('/', (req, res) => {
    res.render('index', { moviesList: movies })
})

router.get('/add-movie', (req, res) => {
    res.render('add-movie')
})
router.post('/add-movie', (req, res) => {
    let title = req.body.title
    let description = req.body.description
    let genre = req.body.genre
    let posterURL = req.body.posterURL

    console.log(title)
    let movie = new Movie(title, description, genre, posterURL)
    movies.push(movie)
    // console.log(movies)
    res.redirect('/movies')
})

router.get('/:genre', (req, res) => {
    let genre = req.params.genre
    console.log(genre)
    let filterGenre = movies.filter((movie) => {
        return movie.genre == genre
    })
    res.render('index', { movies: filterGenre })
})

router.post('/delete-movie', (req, res) => {
    let deleteID = req.body.movieID
    console.log(deleteID)
    movies = movies.filter(function (movie) {
        console.log(movie.movieID)

        return movie.movieID != deleteID
    })
    // tempMovies = movies.filter(movie => movie.movieID != deleteID)
    console.log(movies)
    res.redirect('/movies')
})

router.all('/all', (req, res) => {
    console.log("this is the all route thing i guess?")
    res.redirect('/movies')
})

router.post('/details', (req, res) => {
    let detailsID = req.body.movieID
    console.log(detailsID)
    let details = movies.find(function (movie) {
        console.log(movie.movieID)
        return movie.movieID = detailsID
    })
    // tempMovies = movies.filter(movie => movie.movieID != deleteID)
    res.render('details', details)
})

router.get('/api', (req, res) => {
    res.render('api', { movies: movies })
    // res.send(movies)
})




class Movie {
    constructor(title, description, genre, posterURL) {
        this.title = title
        this.description = description
        this.genre = genre
        this.posterURL = posterURL
        this.movieID = uuid()
    }
}

module.exports = router