import React from 'react';
import './Modal.css';

const BackDrop = (props) => {

    const backDropClasses=['Backdrop', props.show? 'BackdropOpen':'BackdropClose'];

    return (
        <div className={backDropClasses.join(' ')}></div>
    );
};

export default BackDrop;
