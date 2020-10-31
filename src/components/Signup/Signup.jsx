import React, { useState } from 'react';
import { allCountryCodes } from '../../helpers/CountryCodeDb';
import { danceStyles } from '../../helpers/danceStyles';

const EMAIL_PATTERN = /^(([^<>()[]\.,;:\s@"]+(\.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([^<>()[]\.,;:\s@"]+\.)+[^<>()[]\.,;:\s@"]{2,})$/i;

const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/; 
//as least: 1 number, 1 lower case, 1 uppercase, min 8 chars (letters, numbers or underscore),

const validations = {
    name: (v) => v.length > 5,
    email: (v) => EMAIL_PATTERN.test(v.toLowerCase()),
    avatar: (v) => v,
    bio: (v) => v.length > 3,
    city: (v) => v.length > 3,
    country: (v) => v,
    style: (v) => v.length > 0,
    password: (v) => PASSWORD_PATTERN.test(v)
};

const Signup = () => {
    const [ state, setState ] = useState({
        data: {
            name: '',
            email: '',
            avatar: null,
            bio: '',
            city: '',
            country: '',
            style: [],
            password: '',
            gallery: [],
        },
        error: {
            name: true,
            email: true,
            avatar: true,
            bio: true,
            city: true,
            country: true,
            style: true,
            password: true,
        },
        touched: { 
            name: false,
            email: false,
            avatar: false,
            bio: false,
            city: false,
            country: false,
            style: false,
            password: false,
        }
    })
    const [ currentDanceStyle, setCurrentDanceStyle ] = useState(null);
    const [ passwordMatching, setPasswordMatching] = useState(true);


    console.log(state)

    const handleChange = (e) => {
        const { name, value } = e.target;

        const isValid = validations[name](value);

        setState(prev => {
            return {
                ...prev,
                data: {
                    ...prev.data,
                    [name]: value,
                },
                error: {
                    ...prev.error,
                    [name]: !isValid,
                }
            }
        });
        
    }

    const handleBlur = (event) => {
        const { name } = event.target;
    
        setState(prev => {
          return {
            ...prev,
            touched: {
              ...prev.touched,
              [name]: true
            }
          }
        })
    }
    

    const handleCancelDanceStyles = (e) => {
        const filteredDances = state.data.style.filter( d => d!== e.target.innerHTML)
        setState( prev => {
            return {
                ...prev,
                data: {
                    ...prev.data,
                    style: filteredDances,
                }
            }
            
        })
    }   

    const handleSelectNewDanceStyle = (e) => {
        if (e.target.value) {
            setCurrentDanceStyle(e.target.value)
        }
    }

    const handleAddDanceStyle = () => {
        if (currentDanceStyle) {
            if (!state.data.style.includes(currentDanceStyle)) {
                const allDanceStyles = [...state.data.style, currentDanceStyle]
                
                if (allDanceStyles.length > 0) {
                    setState(prev => {
                        return {
                            ...prev,
                            data: {
                                ...prev.data,
                                style: allDanceStyles,
                            },
                            error: {
                                ...prev.error,
                                style: false
                            }
                        }
                    })
                }
            }
        }
        setCurrentDanceStyle(null)
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
    }

    const checkPasswordMatching = (e) => {
        console.log('CHECKING')
        if (state.data.password !== e.target.value) {
            setPasswordMatching(false)
        } else {
            setPasswordMatching(true)
        }
    }

    const isError = Object.values(state.error).some(err => err)

    return (
        <div className="profile-container">

            <div className="row py-2 px-4">
                <div className="col-sm-8 mx-auto">
                    <div className="bg-light shadow rounded overflow-hidden">

                        <div className="media p-3 bg-dark">
                            <div className="media-body mb-1 text-white text-center">
                                <h4>
                                    Sign up form
                                </h4>
                            </div>
                        </div>
                        <div className="row media">
                            <div className="col-12 media-body">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-9 col-sm-10 py-2 mb-3 rounded">
                                
                                        <form onSubmit={ handleSubmitForm }>
                                            <div className="mb-4 form-group">
                                                <label htmlFor="name">
                                                    Name:
                                                </label>
                                            
                                                <input
                                                    className={`form-control ${state.touched.name && state.error.name ? "is-invalid" : ""}`}
                                                    onChange={ handleChange }
                                                    onBlur={ handleBlur }
                                                    name="name"
                                                    type="text"
                                                ></input>

                                                <div className="invalid-feedback">
                                                    Name requires at least 5 characters.
                                                </div>
                                            </div>

                                            <div className="mb-4 form-group">
                                                <label htmlFor="email">
                                                    E-mail:
                                                </label>
                                            
                                                <input
                                                    className={`form-control ${state.touched.email && state.error.email ? "is-invalid" : ""}`}
                                                    onChange={ handleChange }
                                                    onBlur={ handleBlur }
                                                    name="email"
                                                    type="email"
                                                ></input>

                                                <div className="invalid-feedback">
                                                    Email is not valid.
                                                </div>       
                                            </div>

                                            <div className="mb-4 form-group">
                                                <label htmlFor="avatar">
                                                    Profile image:
                                                </label>
                                            
                                                <input
                                                    className={`form-control ${state.touched.avatar && state.error.avatar ? "is-invalid" : ""}`}
                                                    onChange={ handleChange }
                                                    onBlur={ handleBlur }
                                                    name="avatar"
                                                    type="file"
                                                    accept=".jpg,.png"
                                                ></input>

                                                <div className="invalid-feedback">
                                                    No image uploaded.
                                                </div>  
                                            </div>

                                            <div className="mb-4 form-group">
                                                <label htmlFor="city">
                                                    City:
                                                </label>
                                            
                                                <input
                                                    className={`form-control ${state.touched.city && state.error.city ? "is-invalid" : ""}`}
                                                    onChange={ handleChange }
                                                    onBlur={ handleBlur }
                                                    name="city"
                                                    type="text"
                                                ></input>

                                                <div className="invalid-feedback">
                                                    City is not valid.
                                                </div>  
                                            </div>

                                            <div className="mb-4 form-group">
                                                <label htmlFor="country">
                                                    Country:
                                                </label>
                                            
                                                <select 
                                                    className={`form-control ${state.touched.country && state.error.country ? "is-invalid" : ""}`}
                                                    defaultValue="DEFAULT" 
                                                    name="country" 
                                                    onChange={ handleChange }
                                                    onBlur={ handleBlur }
                                                    >
                                                    <option value="DEFAULT" disabled>...choose your country</option>

                                                    { allCountryCodes.map( (c, i) => {
                                                        return <option className="font-italic" value={c.code} key={i}>{c.name}</option>
                                                    })}
                                                </select>

                                                <div className="invalid-feedback">
                                                    Country missing.
                                                </div>  
                                            </div>

                                            <div className="mb-4 form-group">
                                                <label htmlFor="bio">
                                                    Your motto:
                                                </label>
                                            
                                                <textarea
                                                    className={`form-control ${state.touched.bio && state.error.bio ? "is-invalid" : ""}`}
                                                    onChange={ handleChange }
                                                    onBlur={ handleBlur }
                                                    name="bio"
                                                    rows="2"
                                                    placeholder="What is you motto?"
                                                ></textarea>

                                                <div className="invalid-feedback">
                                                    Motto not valid - min. 3 characters.
                                                </div>
                                            </div>

                                            <div className="mb-4 form-group">
                                                <label htmlFor="style">
                                                    What would you like to dance?
                                                </label>

                                                <div className="my-2">
                                                    { state.data.style ? 
                                                        state.data.style.map( (dance, i) => {
                                                            return  (
                                                                <span className="tag bg-secondary rounded text-white mr-1 p-2" 
                                                                    onClick={ handleCancelDanceStyles } 
                                                                    key={i}>
                                                                    { dance }
                                                                </span>
                                                            )
                                                        })
                                                        :
                                                        null
                                                    }
                                                </div>
                                            
                                                <select 
                                                    className={`form-control ${state.touched.style && state.error.style ? "is-invalid" : ""}`}
                                                    defaultValue="DEFAULT" 
                                                    name="style" 
                                                    onChange={ handleSelectNewDanceStyle }
                                                    onBlur={ handleBlur }
                                                >
                                                    <option value="DEFAULT" disabled>...add style</option>
                                                    { danceStyles.map( (d, i) => {
                                                        return (
                                                            <option 
                                                                className="font-italic" 
                                                                value={d} 
                                                                key={i}>
                                                                {d}
                                                            </option>
                                                        )
                                                    })}
                                                </select>
                                                <div className="invalid-feedback">
                                                    Select at least one style.
                                                </div>

                                                <button 
                                                    className="btn btn-sm border border-secondary py-1" 
                                                    onClick={ handleAddDanceStyle }>
                                                    Add
                                                </button>

                                            </div>
                                            
                                            <div className="mb-4 form-group">
                                                <label htmlFor="password">
                                                    Password:
                                                </label>
                                            
                                                <input
                                                    className={`form-control ${state.touched.password && state.error.password ? "is-invalid" : ""}`}
                                                    onChange={ handleChange }
                                                    onBlur={ handleBlur }
                                                    name="password"
                                                    type="password"
                                                ></input>

                                                <div className="invalid-feedback">
                                                    Password not valid - min 8 characters with 1 number, 1 lowercase letter, 1 capital letter.
                                                </div>

                                                <label htmlFor="password" className="mt-3">
                                                    Repeat password:
                                                </label>
                                            
                                                <input
                                                    className="d-block form-control"
                                                    onChange={ checkPasswordMatching }
                                                    name="check"
                                                    type="password"
                                                ></input>

                                                { !passwordMatching ? 
                                                    <div className="small text-danger">
                                                        Passwords are not matching
                                                    </div>
                                                    :
                                                    null
                                                }

                                                { state.error.password ?
                                                    <div>{ state.error.password }</div>
                                                    :
                                                    null
                                                }
                                            </div>


                                            <button
                                                className="btn btn-sm btn-secondary pull-right px-3"
                                                /*  onClick={handlePublishPost} */
                                                disabled={ isError }
                                                >
                                                Save
                                            </button>
                                        </form>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
}

export default Signup;