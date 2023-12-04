const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../middleware/auth.middleware')
const {upload} = require('../middleware/file.middleware')



const Cinema = require('../models/Cinema');

router.get('/', async (req, res, next) => {
	try {
		const cinemas = await Cinema.find().populate('movies');
		return res.status(200).json(cinemas)
	} catch (error) {
		return next(error)
	}
});

router.post('/create', isAuthenticated,upload.single('picture'), async (req, res, next) => {
    try{
        const cinemaPicture = req.file ? req.filename: null
        const newCinema = new Cinema({
            name: req.body.name,
            location: req.body.location,
            movies: [],
            picture: characterPicture
        });

        const createdCinema = await newCinema.save();
        return res.status(201).json(createdCinema);
    }catch(error){
        return res.status(500).json("Error del servidor");
    }
});

router.delete('/:id', async (req, res, next) => {
    try{
        const {id} = req.params;
        const cinemaDeleted = await Cinema.findByIdAndDelete(id);
        return res.status(200).json(cinemaDeleted);
    }catch(error){
        return res.status(500).json("Error del servidor");
    }
});

router.put('/add-movie', async (req, res, next) => {
    try {
        const  cinemaId  = req.body._id;
        const  movieId  = req.body.movieToAdd;
        const updatedCinema = await Cinema.findByIdAndUpdate(
            cinemaId,
            { $push: { movies: movieId } },
            { new: true }
        );
        return res.status(200).json(updatedCinema);
    } catch (error) {
        return res.status(500).json("Error del servidor");
    }
});

module.exports = router;