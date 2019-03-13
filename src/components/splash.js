import React from 'react';

const Splash = (props) => {
    return ( 
        <div>
            Splash Page
            <button onClick={props.splashButton}>Test</button>
        </div>
     );
}
 
export default Splash;