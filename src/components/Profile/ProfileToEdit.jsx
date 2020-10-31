import React, { useEffect, useState, cleanup } from 'react';
import { Redirect } from 'react-router-dom';
import { allCountryCodes } from '../../helpers/CountryCodeDb';
import { danceStyles } from '../../helpers/danceStyles';
import { updateUser } from '../../services/UserClient';
import { deleteUser } from '../../services/UserClient';

const ProfileToEdit = ( { user , deactivateView, updatePerfil } ) => {
    const [ state, setState ] = useState({
        id: '',
        name: '',
        city: '',
        country: '',
        bio: '',
        danceStyles: [],
        galleryLength: 0,
        postsLength: 0
    });
    const [ avatar, setAvatar ] = useState(null);
    const [ currentDanceStyle, setCurrentDanceStyle ] = useState('');
    const [ userIsCancelled, setUserIsCancelled ] =  useState(false)

    useEffect(() => {
        setState({
            id: user.id,
            name: user.name,
            city: user.city,
            country: user.country,
            bio: user.bio,
            danceStyles: user.style,
            galleryLength: user.gallery.length,
            postsLength: user.posts.length
        })

        return () => cleanup
    }, [user])

    const clickedSaveChanges = () => {
        const avatarImg = document.querySelector("#avatar");
        const formData = new FormData()

        if (avatar) {
            formData.append('avatar', avatarImg.files[0])
        }

        formData.append('body', JSON.stringify(state))

        updateUser(formData)
            .then( updatedUser =>  {
                console.log(updatedUser)
                updatePerfil(updatedUser)
            })
            .catch(err => console.log(err))
       
    }

    const handleFieldUpdate = (e) => {
        const { value, name } = e.target;
        setState(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleCancelDanceStyles = (e) => {
        const filteredDances = state.danceStyles.filter( d => d!== e.target.innerHTML)
        setState(prev => {
            return {
                ...prev,
                danceStyles: filteredDances
            }
        })
    }   

    const handleSelectNewDanceStyle = (e) => {
        setCurrentDanceStyle(e.target.value)
    }

    const handleAddDanceStyle = () => {
        if (!state.danceStyles.includes(currentDanceStyle)) {
            const allDanceStyles = [...state.danceStyles, currentDanceStyle]
            setState(prev => {
                return {
                    ...prev,
                    danceStyles: allDanceStyles
                }
            })
        }
    }

    const handleNewImage = () => {
        setAvatar(true)
    }

    const handleCancelProfile = () => {
        deleteUser(state.id)
            .then(() => setUserIsCancelled(true))
            .catch(err => console.log(err))
    }

    if (!state.name) {
        return <div>Loading...</div>
    }

    if (userIsCancelled) {
        return <Redirect to="/signup" />
    }

    return (
        <div>
            <div className="p-3 bg-dark">
                <div className="media  profile-header">
                    
                    <span className="profile-image avatar w-120 mr-2">
                        <div style={{position: 'relative'}} className="text-white">
                            { avatar? 
                                <u>ok</u>
                                :
                                <u>new image</u> 
                            }
                            <input 
                                style={{opacity: '0', position: 'absolute', top: '0'}} 
                                className="form-control border border-info" 
                                onChange={ handleNewImage }
                                id="avatar"
                                name="avatar" 
                                title="  " 
                                type="file" 
                            />
                        </div>
                    </span>

                    <div className="media-body mb-2 text-white profile-card-header ">
                        <div>
                            <textarea 
                                className="bg-dark text-white my-auto" 
                                value={ state.name } 
                                onChange={ handleFieldUpdate }
                                name="name" 
                                rows="1"
                            ></textarea> 

                            <div className="d-flex flex-wrap">
                                <textarea 
                                    className="bg-dark text-white font-italic my-2" 
                                    value={ state.city } 
                                    onChange={ handleFieldUpdate }
                                    name="city" 
                                    rows="1"
                                ></textarea>
                                <select 
                                    className="bg-dark text-white font-italic my-auto" 
                                    value={state.country}
                                    name="country" 
                                    onChange={ handleFieldUpdate }
                                    >
                                    { allCountryCodes.map( (c, i) => {
                                        return <option className="font-italic" value={c.code} key={i}>{c.name}</option>
                                    })}
                                </select>
                            </div> 
                        </div>
                    </div>
                </div>
                <div className="">
                    <button 
                        className="btn btn-sm text-warning border border-warning" 
                        onClick={ deactivateView }>
                        Cancel changes
                    </button>
                    <button 
                        className="btn btn-sm text-warning border border-warning mx-1 my-2" 
                        onClick={ clickedSaveChanges }>
                        Save changes
                    </button>
                </div>
            </div>

            <div className="bg-light p-3 d-flex justify-content-between text-center w-100">
                <button 
                    className="btn btn-sm text-danger border border-danger"
                    onClick={ handleCancelProfile }>
                    Cancel profile
                </button>
                <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                        <h5 className="font-weight-bold mb-0 d-block">{ state.galleryLength }</h5>
                        <small className="text-muted"> <i className="fa fa-picture-o mr-1"></i>Photos</small>
                    </li>
                    <li className="list-inline-item">
                        <h5 className="font-weight-bold mb-0 d-block">{ state.postsLength }</h5>
                        <small className="text-muted"> <i className="fa fa-pencil mr-1"></i>Posts</small>
                    </li>
                </ul>
            </div>

            <div className="pt-4 px-4">
                <textarea 
                    className="w-100 font-italic border border-light" 
                    value={ state.bio } 
                    name="bio" 
                    onChange={ handleFieldUpdate }
                    rows="5" 
                ></textarea>
                <div>
                    <div className="m-2">
                    { state.danceStyles.map( (dance, i) => {
                        return  (
                            <span className="tag bg-secondary rounded text-white mr-1 p-2" 
                                onClick={ handleCancelDanceStyles } 
                                key={i}>{ dance }
                            </span>
                            )
                    })}
                    </div>
                    <div>
                        <select className="font-italic my-auto m-2" 
                            defaultValue="DEFAULT" 
                            name="country" 
                            onChange={ handleSelectNewDanceStyle }
                        >
                            <option value="DEFAULT" disabled>...add style</option>
                            { danceStyles.map( (d, i) => {
                                return <option className="font-italic" value={d} key={i}>{d}</option>
                            })}
                        </select>
                        <button className="btn btn-sm border border-secondary py-0" onClick={ handleAddDanceStyle }>
                            Add
                        </button>
                    </div>

                       
                </div>
            </div>
        </div>
    )
}

export default ProfileToEdit;