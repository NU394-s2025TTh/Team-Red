import { Hourglass } from 'ldrs/react';
import 'ldrs/react/Hourglass.css';


export default function Loading() {

    return(

    <div className="loading-container">

        <div className="hourglass">

        <Hourglass 
            size="40" 
            bgOpacity="0.1"
            speed="1.3"
            color="black" />

        </div>

        <div className="loading-text">
            <p>generating...</p>
        </div>
        


    </div>

    );
    
}