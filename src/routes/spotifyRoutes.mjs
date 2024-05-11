import express from 'express';
import { getTracks} from '../controller/spotifyController.mjs';

const router = express.Router();

router.get("/spotify-tracks/:title", getTracks);

// router.get("/spotify-artist", getArtists);

export { router };
