const router = require("express").Router();
const verify = require("../util/verifyToken");
const Movie = require("../models/Movie");

// CREATE MOVIE
router.post("/addmovie", verify, async (req, res) => {
  try {
    if (!req.decoded.isAdmin) {
      return res.status(401).send("user is not admin");
    }
    const newMovie = new Movie({
      title: req.body.title,
      desc: req.body.desc,
      genre: req.body.genre,
      img: req.body.img,
      isSeries: req.body.isSeries
    });
    console.log(newMovie);
    const movie = await newMovie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.post("/update/:id", verify, async (req, res) => {
  try {
    if (!req.decoded.isAdmin) {
      return res.status(401).send("user is not admin");
    }

    const movie = await Movie.findOne({_id: req.params.id});

    console.log(movie);

    if (req.body.title) {
      movie.title = req.body.title;
    }
    if (req.body.desc) {
      movie.desc = req.body.desc;
    }
    if (req.body.image) {
      movie.image = req.body.image;
    }
    if (req.body.imageTitle) {
      movie.imageTitle = req.body.imageTitle;
    }
    if (req.body.imageSm) {
      movie.imageSm = req.body.imageSm;
    }
    if (req.body.trailer) {
      movie.trailer = req.body.trailer;
    }
    if (req.body.video) {
      movie.video = req.body.video;
    }
    if (req.body.year) {
      movie.year = req.body.year;
    }
    if (req.body.limit) {
      movie.limit = req.body.limit;
    }
    if (req.body.genre) {
      movie.genre = req.body.genre;
    }
    if (req.body.isSeries) {
      movie.isSeries = req.body.isSeries;
    }

    const movieUpdated = await movie.save();
    return res.status(200).json({
      title: movieUpdated.title,
      desc: movieUpdated.desc,
      image: movieUpdated.img,
      imageTitle: movieUpdated.imgTitle,
      imageSm: movieUpdated.imgSm,
      trailer: movieUpdated.trailer,
      video: movieUpdated.video,
      year: movieUpdated.year,
      limit: movieUpdated.limit,
      genre: movieUpdated.genre,
      isSeries: movieUpdated.isSeries
    });
  } catch (err) {
    res.status(500).send(err);
  }
})
// GET
router.get ("/find/:id", verify, async (req, res) => {
  
  try {
    const movie = await Movie.findOne({_id: req.params.id});

    if (!movie) {
      return res.status(404).send ("movie not found");
    }
  
    return res.status(200).json(movie);
    } catch (err) {
      res.status(500).json(err);
  
  }
})

// GET ALL

router.get ("/getall", async (req, res) => {
  try {

    const movies = await Movie.find();

    return res.status(200).json({movies});

    } catch (err) {
      res.status(500).json(err);
    }
  }
)  
// DELETE
router.post ("/delete/:id", verify, async (req, res) => {
  try {

    const movie = await Movie.deleteOne({_id: req.params.id});
    console.log(movie);

    return res.status(200).send("movie deleted");

  } catch (err) {
    res.status(500).json(err);
  }
})

// RANDOM
router.get ("/random", verify, async (req, res) => {
  
  try {

    const movies = await Movie.find({isSeries: req.body.isSeries});
    const movie = movies[Math.floor(Math.random() * movies.length)];

    return res.status(200).send({movie});
  
    } catch (err) {
      res.status(500).json(err);
  }
})

module.exports = router;
