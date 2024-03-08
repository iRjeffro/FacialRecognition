import React from "react";

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className='white f1'>
                {`Hello, ${name}!`}
            </div>
            {/* <div className='white f3'>
                {`Entries: ${entries}`}
            </div> */}
        </div>
    )
}

export default Rank;