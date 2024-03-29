import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, submitForm }) => {
    return (
        <div className='container'>
            <p className="f3">
                {'The Brain Will Detect Faces In Your Pictures. Give It A Try!'}
            </p>
            <div className='form pa4 br3 shadow-5 center w-40'>
                <input className='f4 pa2 w-70 center br3 input' type="text" onInput={onInputChange}/>
                <button className='w-30 grow f5 link ph3 pv2 dib white bg-light-purple br3 bttn' onClick={submitForm}>Detect</button>
            </div>
        </div>
    );
};

export default ImageLinkForm;