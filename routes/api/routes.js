const express = require('express');
const routes = express.Router();
const control = require('../../controller/controllers');

routes.route('/login')
.post(control.login);

routes.route('/register')
.post(control.register);

routes.route('/movies')
.get(control.getMovies);

routes.route('/movie/:movieId')
.get(control.getMovieById);

routes.route('/addMovie')
.post(control.addMovie);

routes.route('/reviews/:movieId')
.get(control.getReviews);

routes.route('/addReview')
.post(control.addReview);

module.exports = routes;