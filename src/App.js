import React, { useState } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ParticlesBg from 'particles-bg';
import './App.css';

const setupFacialRec = (imageUrl) => {
  const PAT = '79f95e79e73c49099fc18d28d20e2b72';
  const USER_ID = 'irjeffro';       
  const APP_ID = 'FaceRec';
  const MODEL_ID = 'face-detection'; 
  const IMAGE_URL = imageUrl;
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




function App() {
  const [imageLink, setImageLink] = useState('');
  const [imageUrl, setImageUrl] = useState('');  
  const onInputChange = (e) => {
    setImageLink(e.target.value);
  };
  const submitForm = () => {
    setImageUrl(imageLink);
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", setupFacialRec(imageLink))
      .then(response => response.json())
      .then(response => {
        console.log('hi', response)
      })
      .catch(err => console.log(err));
    //   .then(
    //   function(response) {
    //     console.log(response);
    //   },
    //   function(err) {

    //   }
    // );

    // fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
//    
  };

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} 
        submitForm={submitForm} />
      <FaceRecognition imageUrl={imageUrl} />
    </div>
  );
}

export default App;
