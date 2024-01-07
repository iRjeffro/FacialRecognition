require('dotenv').config();
const patKey = process.env.PAT_KEY;
const userID = process.env.USER_ID;

const setupFacialRec = (URL) => {
    const PAT = patKey;
    const USER_ID = userID;       
    const APP_ID = 'FaceRec'; 
    const IMAGE_URL = URL;
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });
  
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
    return requestOptions;
  }

const handleImageURL = (req, res) => {
    const MODEL_ID = 'face-detection';
    const { input } = req.body;
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", setupFacialRec(input))
        .then(response => response.json())
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to Reach API')) 
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id).increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json('Unable to acquire entries'));
}

module.exports = {
    handleImage: handleImage,
    handleImageURL: handleImageURL
}