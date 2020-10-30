import React from 'react';

const PhotoGallery = ({ images }) => {

    return (
        <div className="row">
            { images.map( (img, ind) => {
                return (
                    <div className="col-lg-6 mb-2 pr-lg-1 text-center" key={ ind }>
                        <img className="img-fluid rounded shadow-sm w-photo m-auto" src={ img } alt=".."/>
                    </div>
                )
            })
            }
        </div> 
        
    )
    
}

export default PhotoGallery;