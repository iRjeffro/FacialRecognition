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
  const [box, setBox] = useState({});

  const calculateFaceLocation = (data) => {
    const foundFaceAll = [];
    for (let i=0;i<data.outputs.length;i++) {
      let foundFace = data.outputs[i];
      console.log(foundFace);
    }
    
    const clariFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clariFace.left_col * width,
      topRow: clariFace.top_row * height,
      rightCol: width - (clariFace.right_col * width),
      bottomRow: height - (clariFace.bottom_row * height),
    }
  }

  const displayBox = (obj) => {
    setBox(obj);
  }

  const onInputChange = (e) => {
    setImageLink(e.target.value);
  };

  const submitForm = () => {
    setImageUrl(imageLink);
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", setupFacialRec(imageLink))
      .then(response => response.json())
      .then(response => displayBox(calculateFaceLocation(response)))
      .catch(err => console.log(err))
  };

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} 
        submitForm={submitForm} />
      <FaceRecognition box={box} imageUrl={imageUrl} />
    </div>
  );
}

export default App;
