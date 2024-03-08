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


function App() {
  const [imageLink, setImageLink] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [route, setRoute] = useState('signin');
  const [dims, setDims] = useState({});
  const [userData, setUserData] = useState({id: '', name: '', email: '', entries: 0, joined: ''});

  const loadUser = (data) => {
    setUserData({
      id: data.id, 
      name: data.name, 
      email: data.email, 
      entries: data.entries, 
      joined: data.joined
    });
    return userData;
  }
  
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

  const submitForm = async () => {
    setImageUrl(imageLink);
    if (imageLink) {
      await fetch(`${process.env.REACT_APP_API_URL}/imageurl`, {
              method: 'post',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                input: imageLink
              })
      })
        .then(response => response.json())
        .then(response => {
          // if (response) {
          //   fetch('https://35.94.117.179/image', {
          //     method: 'put',
          //     headers: {'Content-Type': 'application/json'},
          //     body: JSON.stringify({
          //       id: userData.id
          //     })
          //   })
          //   .then(response => response.json())
          //   .then(count => {
          //     setUserData(Object.assign(userData, {entries: count}));
          //     loadUser(userData);
          //   })
          //   .catch(err => console.log(err))
          // }
          calculateFaceLocation(response);
        })
        .catch(err => console.log(err))
    }
  };

  const onRegister = () => {
    setRoute('register');
  }

  const onSignOut = () => {
    setRoute('signin');
    setImageLink('');
    setImageUrl('');
    setDims({});
  }

  const signIn = () => {
    setRoute('home');
  }

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
      { route === 'signin'
      ? <div>
          <Logo />
          <SignIn onRegister={onRegister} signIn={signIn} loadUser={loadUser} />
        </div>
      : (
          route === 'register'
          ? <div>
              <Logo />
              <Register signIn={signIn} onRegister={onRegister} loadUser={loadUser} onSignOut={onSignOut} />
            </div>
          : <div>
              <Navigation onSignOut={onSignOut} />
              <Logo />
              <Rank name={userData.name} entries={userData.entries} />
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
