import React from 'react';
import ReactDom from 'react-dom';
import './Popup.css';

const Popup = ({ open, children, closePop , handleYesAnswer }) => {
    if (!open) return null

    return ReactDom.createPortal(
        <div className="popup-container">

            <div className="popup-window text-center border border-secondary bg-light rounded">
                <p>{ children }</p>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-sm btn-secondary px-2 m-2" onClick={ handleYesAnswer } >Yes</button>
                    <button className="btn btn-sm btn-secondary px-2 m-2" onClick={ closePop }>No</button>
                </div>
            </div>

        </div>,
        document.getElementById('portal')
    )

}

export default Popup;