import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = () => {
    return (
        <div className=''>
            <p className="f3">
                {'The Brain Will Detect Faces In Your Pictures. Give It A Try!'}
            </p>
            <div className='form pa4 br3 shadow-5 center w-40'>
                <input className='f4 pa2 w-70 center br3' type="text" />
                <button className='w-30 grow f5 link ph3 pv2 dib white bg-light-purple br3'>Detect</button>
            </div>
        </div>
    )
}

export default ImageLinkForm;