import React from "react";

const Navigation = ({ onSignOut }) => {
    return (
        <nav style={{display: 'flex', justifyContent: 'flex-end', paddingRight: '40'}}>
            <p className='f3 link dim black underline pa3 pointer'onClick={onSignOut}>Sign Out</p>
        </nav>
    )
}

export default Navigation;