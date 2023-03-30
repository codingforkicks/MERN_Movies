let User = require("../models/users");
let Movie = require("../models/movies");
let Review = require("../models/reviews");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  try{
    if(user) {
      let passwordMatch = await bcrypt.compare(req.body.password, user.password);
      if (passwordMatch) {
        let reviews = await Review.find({ enteredBy: user._id });
        res.status(200).json({ 
          auth: true, 
          reviews,
          token: {
            id: user._id,
            name: user.username,
            admin: user.admin
          },
        });
      } else {
        res.status(406).json({
          message: "user not authenicated",
          auth: false,
        });
      }
    } else {
      res.status(407).json({
        message: "user not authenicated",
        auth: false
      });
    }
  } catch(err) {
    res.status(408).json({
      message: "invalid username or password",
      auth: false
    });
    res.end();
  };
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
        sum = sum + review.rating;
        count++;
      }
    });
    return {
      id: movie._id,
      title: movie.title,
      genre: movie.genre,
      year: movie.year,
      averageRating: sum/count,
    };
  });
  res.status(200).json(ratedMovies);
};

exports.getMovieById = async (req, res) => {
  const movie = await Movie.find({_id: req.params.movieId });
  res.status(200).json({ movie: movie[0] });
}

exports.addMovie = async (req, res) => {
  //check to see if movie already exists in the database
  let doesExists = await Movie.exists({
    title: req.body.title,
    genre: req.body.genre,
    year: req.body.year
  });

  if(doesExists === null) {
    try {
      let query = await Movie.create(req.body);
      res.status(201).json(query);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
  }else {
    res.status(200).json({message: "movie already exists"});
  }
};

exports.getReviews = async (req, res) => {
  let reviews = await Review.find({ movie: req.params.movieId });
  let averageRating =
    reviews.reduce((results, review) => results + review.rating, 0) /
    reviews.length;
  res.status(200).json({ reviews: reviews, averageRating: averageRating });
};

exports.addReview = async (req, res) => {
  console.log(req.body);
  try {
    let query = await Review.create(req.body);
    res.status(201).json(query);
  }
  catch(err) {
    console.log(err)
    res.status(406).json({err})
  }
};