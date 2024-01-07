import React from "react";
import Tilt from 'react-parallax-tilt';
import ai from './ai.png';
import './Logo.css';
import 'tachyons';

const Logo = () => {
    return (
        <div className="ma4 mt0 w-10">
            <Tilt className="Tilt br2 shadow-2" style={{ display: 'flex', justifyContent: 'center', alignContent: 'flex-start', width: '100px' }}>
                <div className='' style={{ height: '100px', width: '50px' }}>
                    <h1><img className='' src={ai} alt='logo'style={{ paddingTop: '5px', display: 'flex', alignItems: 'flex-end' }}/></h1>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;