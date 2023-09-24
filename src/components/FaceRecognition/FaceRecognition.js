import React from "react";
import 'tachyons';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, dims }) => {    
    const finalDims = [];
    for (let [face, properties] of Object.entries(dims)) {
        finalDims[face] = {
            id: properties.id,
            top: properties.topRow,
            bottom: properties.bottomRow,
            right: properties.rightCol,
            left: properties.leftCol
        }
    }

    let boxElems = finalDims.map((face) => {
        return <div className='bounding-box' key={face.id} style={{top: face.top, bottom: face.bottom, left: face.left, right: face.right}}></div>
    });
        
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                {boxElems}
                <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto' />
            </div>
        </div>
    );  
    
};

export default FaceRecognition;