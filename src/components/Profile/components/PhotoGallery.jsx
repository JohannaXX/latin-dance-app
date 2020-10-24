import React from 'react';

const PhotoGallery = ({ images }) => {

    return (
        <div className="row">
            { images.map( i => {
                return (
                    <div className="col-lg-6 mb-2 pr-lg-1">
                        <img className="img-fluid rounded shadow-sm w-photo" src={ i } alt=".."/>
                    </div>
                )
            })
            }
        </div> 
        
    )
    
}

export default PhotoGallery;