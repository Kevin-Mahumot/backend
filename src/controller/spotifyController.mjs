import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const clientId =process.env.CLIENT_ID;
const clientSecret =process.env.CLIENT_SECRET;

const redirectUri = 'http://localhost:5000'; // Add your redirect URI

async function getToken() {
  const response = await axios.post('https://accounts.spotify.com/api/token', {
    grant_type: 'client_credentials',
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: clientId,
      password: clientSecret,
    },
  });
    return response.data.access_token;
}



// async function getArtists(req, res) {
//   const { query } = req.query; // Assuming you're passing the query parameter in the URL like /spotify-artist?query=artist_name

//   const accessToken = await getToken();

//   try {
//     const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=artist&limit=10`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     res.json({ success: true, artists: response.data.artists.items });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Failed to get artists' });
//   }
// }

async function getTracks(req, res) {
  const title = req.params.title;

  const accessToken = await getToken(); 
  console.log(accessToken);

  
  try {
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${title}&type=track&limit=18`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    res.json({ success: true, tracks: response.data.tracks.items });
    console.log(accessToken);

  } catch (error) {
    console.log(accessToken);

    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to get tracks' });
  }
}

export { getTracks};