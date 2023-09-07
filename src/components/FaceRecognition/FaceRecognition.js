import React from "react";
import 'tachyons';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {    
    const top = box.topRow;
    const bottom = box.bottomRow;
    const right = box.rightCol;
    const left = box.leftCol;
    
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <div className='bounding-box' style={{top: top, bottom: bottom, left: left, right: right}} ></div>
                <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto' />
                
            </div>
        </div>
    );
};

export default FaceRecognition;

// 