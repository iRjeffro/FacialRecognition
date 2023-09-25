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
  const [route, setRoute] = useState('signin');
  const [dims, setDims] = useState({});
  const [userData, setUserData] = useState({username: '', password: '', email: ''});

  const calculateFaceLocation = (data) => {
    const foundFaceAll = [];
    for (let i=0; i<data.outputs[0].data.regions.length; i++) {
      let foundFace = data.outputs[0].data.regions[i].region_info.bounding_box;
      foundFaceAll.push(foundFace);
    }
    
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const faceDims = { };

    for (let i=0; i<foundFaceAll.length; i++) {
      const clariFace = foundFaceAll[i];
      faceDims[i] = {
        id: 'face' + (i + 1),
        leftCol: clariFace.left_col * width,
        topRow: clariFace.top_row * height,
        rightCol: width - (clariFace.right_col * width),
        bottomRow: height - (clariFace.bottom_row * height)
      }
    }
    setDims(faceDims);
  }

  const onInputChange = (e) => {
    setImageLink(e.target.value);
  };

  const submitForm = () => {
    const MODEL_ID = 'face-detection';
    setImageUrl(imageLink);
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", setupFacialRec(imageLink))
      .then(response => response.json())
      .then(response => calculateFaceLocation(response))
      .catch(err => console.log(err))
  };

  const onRegister = () => {
    setUserData({username: '', password: '', email: ''});
    setRoute('register');
    console.log(userData);
  }

  const onSignOut = () => {
    setUserData({username: '', password: '', email: ''});
    setRoute('signin');
    setImageLink('');
    setImageUrl('');
    setDims({});
  }

  const signIn = () => {
    if ((userData.email !== '') && (userData.password !== '')) {
      setRoute('home');
      setUserData({username: '', password: '', email: ''});
    }
  }

  const onSignInFields = (e) => {
    if (e.target.id === 'email-address') {
      setUserData({
        email: e.target.value,
        password: userData.password
      });
    } else {
      setUserData({
        email: userData.email,
        password: e.target.value
      });
    }
  }

  const regUser = () => {
    if ((userData.username !== '') && (userData.email !== '') && (userData.password !== '')) {
        setRoute('signin');
        setUserData({username: '', password: '', email: ''});
    }
  }

  const onRegisterFields = (e) => {
    if (e.target.id === 'name') {
      setUserData({
        username: e.target.value,
        email: userData.email,
        password: userData.password
      });
    } else if (e.target.id === 'email') {
      setUserData({
        username: userData.username,
        email: e.target.value,
        password: userData.password
      });
    } else if (e.target.id === 'password') {
      setUserData({
        username: userData.username,
        email: userData.email,
        password: e.target.value
      });
    }
  }

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
      { route === 'signin'
      ? <div>
          <Logo />
          <SignIn onRegister={onRegister} signIn={signIn} onSignInFields={onSignInFields} />
        </div>
      : (
          route === 'register'
          ? <div>
              <Logo />
              <Register onRegisterFields={onRegisterFields} onRegister={onRegister} regUser={regUser} onSignOut={onSignOut} />
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
