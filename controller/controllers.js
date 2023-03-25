let User = require("../models/users");
let Movie = require("../models/movies");
let Review = require("../models/reviews");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  let user = await User.findOne({ username: req.body.username });

  if (user) {
    console.log(req.body.password);
    console.log(user);
    let match = await bcrypt.compare(req.body.password, user.password);
    console.log(match);
    if (match) {
      let reviews = await Review.find({ enteredBy: user._id });
      res.status(200).json({ auth: true, reviews });
    } else {
      res.status(200).json({ auth: false });
    }
  } else {
    res.status(200).json({ auth: false });
  }
};

exports.register = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 6);
    let query = await User.create(req.body);
    res.status(201).json(query);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

exports.getMovies = async (req, res) => {
  const movies = await Movie.find();
  const reviews = await Review.find();
  const ratedMovies = movies.map((movie) => {
    let sum = 0;
    let count = 0;
    reviews.map((review) => {
      if (review.movie.toString() === movie._id.toString()) {
        console.log(review);
        sum = sum + review.rating;
        count++;
      }
    });
    return {
      title: movie.title,
      genre: movie.genre,
      year: movie.year,
      averageRating: sum/count,
    };
  });
  res.status(200).json(ratedMovies);
};

exports.addMovie = async (req, res) => {
  try {
    let query = await Movie.create(req.body);
    res.status(201).json(query);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

exports.getReviews = async (req, res) => {
  let reviews = await Review.find({ movie: req.params.movieId });
  let averageRating =
    reviews.reduce((results, review) => results + review.rating, 0) /
    reviews.length;
  console.log(averageRating);
  res.status(200).json({ reviews: reviews, averageRating: averageRating });
};

exports.addReview = async (req, res) => {
  let query = await Review.create(req.body);
  res.status(201).json(query);
};