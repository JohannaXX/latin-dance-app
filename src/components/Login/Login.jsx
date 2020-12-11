import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { login } from '../../services/UserClient';
import { loginWithGoogle } from '../../services/UserClient';


const validations = {
    email: v => v.length,
    password: v => v.length
};

const Login = (props) => {
    const [state, setState] = useState({
        data: {
          email: "",
          password: ""
        },
        error: {
          email: true,
          password: true
        },
        touch: {},
    }) 

    const [ loginError, setLoginError] = useState(false)

    const authContext = useAuthContext()


    const { data, error, touch } = state

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const user = await login(data)

            authContext.login(user)
        } catch(err) {
            setLoginError(err.response?.data?.message)
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        const validationFn = validations[name];
        const isValid = validationFn(value);
    
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
      };
    
      const handleBlur = (event) => {
        const { name } = event.target;
    
        setState(prev => {
          return {
            ...prev,
            touch: {
              ...touch,
              [name]: true
            }
          }
        })
    }

    const handleLoginWithGoogle = () => {
        loginWithGoogle()
            .then( user => authContext.login(user))
            .catch( err => console.log(err))
    }


    const isError = Object.values(error).some(err => err);

    return (
        <div className="Login-container">

            <div className="row py-2 px-4">
                <div className="col-sm-8 mx-auto">
                    <div className="bg-light shadow rounded overflow-hidden">

                        <div className="media p-3 bg-dark">
                            <div className="media-body mb-1 text-white text-center">
                                <h4>
                                    Login
                                </h4>
                            </div>
                        </div>
                        <div className="row media">
                            <div className="col-12 media-body">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-9 col-sm-10 py-2 mb-3 rounded">

                                    { loginError && 
                                        <div className="alert alert-danger">
                                            {loginError}
                                        </div>
                                    }

                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="name">Email</label>

                                                <input
                                                value={data.email}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                name="email"
                                                type="text"
                                                className={`form-control ${touch.email && error.email ? "is-invalid" : ""}`}
                                                placeholder="Enter email"
                                                />

                                                <div className="invalid-feedback">email is wrong</div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="tagline">Password</label>

                                                <input
                                                name="password"
                                                value={data.password}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                type="password"
                                                className={`form-control ${touch.password && error.password ? "is-invalid" : ""}`}
                                                placeholder="Enter password"
                                                />

                                                <div className="invalid-feedback">error</div>
                                            </div>

                                            <div className="d-flex justify-content-end">
                                                <button
                                                    type="submit"
                                                    className="btn btn-secondary"
                                                    disabled={isError}
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                        
                                        <div id="social-login-area" className="text-center mt-3">
                                            <div id="social-login-btns">
                                                <a
                                                    className="btn border border-secondary text-primary m-2 px-2 py-1 rounded"
                                                    href="https://latin-dance-app-backend.herokuapp.com/auth/google"
                                                    >
                                                    <i className="fa fa-google"></i> Log in with Google
                                                </a>  

                                                <a
                                                    className="btn border border-secondary text-primary m-2 px-2 py-1 rounded"
                                                    href="https://latin-dance-app-backend.herokuapp.com/auth/slack"
                                                    >
                                                    <i className="fa fa-slack"></i> Log in with Slack
                                                </a>
                                            </div>
                                            <p className="mt-3">
                                                You don't have an account? <a href="/signup">register here</a> 
                                            </p>
                                        </div>
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

export default Login;