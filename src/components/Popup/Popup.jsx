import React from 'react';
import './Popup.css';

const Popup = ({ question , provideAnswer}) => {


    return (
        <div className="popup-container">

            <div className="popup-window text-center border border-secondary bg-light b-3 rounded">
                <p>{ question }</p>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-sm btn-secondary m-2" onClick={ provideAnswer } >Yes</button>
                    <button className="btn btn-sm btn-secondary m-2" onClick={ provideAnswer }>No</button>
                </div>
            </div>

        </div>
    )

}

export default Popup;