import React, { useState } from 'react';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
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
  const [route, setRoute] = useState('signin');
  const [dims, setDims] = useState({});

  const calculateFaceLocation = (data) => {
    const foundFaceAll = [];
    for (let i=0; i<data.outputs[0].data.regions.length; i++) {
      let foundFace = data.outputs[0].data.regions[i].region_info.bounding_box;
      foundFaceAll.push(foundFace);
    }

    // test images below
    
    // https://d.newsweek.com/en/full/317741/beautiful-faces.webp?w=961&f=d1cb527319916fbbad2ae014ad71570f

    // https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-2.png
    
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const faceDims = { };

    for (let i=0; i<foundFaceAll.length; i++) {
      const clariFace = foundFaceAll[i];
      faceDims[i] = {
        leftCol: clariFace.left_col * width,
        topRow: clariFace.top_row * height,
        rightCol: width - (clariFace.right_col * width),
        bottomRow: height - (clariFace.bottom_row * height)
      }
    }
    setDims(faceDims);
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

  const onRouteChange = () => {
    setRoute('home');
  }

  const onRegister = () => {
    setRoute('register');
  }

  const onSignOut = () => {
    setRoute('signin');
  }

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
      { route === 'signin'
      ? <div>
          <Logo />
          <SignIn onRouteChange={onRouteChange} onRegister={onRegister} />
        </div>
      : (
          route === 'register'
          ? <div>
              <Logo />
              <Register onRegister={onRegister} onSignOut={onSignOut} />
            </div>
          : <div>
              <Navigation onSignOut={onSignOut} />
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={onInputChange} 
                submitForm={submitForm} />
              <FaceRecognition dims={dims} imageUrl={imageUrl} />
            </div>
        )    
      }
    </div>
  );
}

export default App;
