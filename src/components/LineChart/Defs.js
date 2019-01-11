import React from 'react';

const Defs = props => (
    <defs>
        <linearGradient is id={props.id} x1="0%" y1="100%" x2="0%" y2="0%" spreadMethod="pad">
            <stop is offset="10%" stop-color={props.color1} stop-opacity={.4}/>
            <stop is offset="80%" stop-color={props.color2} stop-opacity={1}/>
        </linearGradient>
    </defs>
)

export default Defs