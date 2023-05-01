import React, { useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

// Component
import LoginForm from '../Components/LoginForm';
import RegiRegisterFormster from '../Components/RegisterForm';

const LoginLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // check token
    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get(`${process.env.REACT_APP_URL_DOMAIN}check`, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                });

                if (response.status === 200) {
                    navigate('/todolist');
                }else{
                  navigate('/');
                }
            } catch (error) {
                // window.alert(error?.response?.data?.message);
            }
        };
        checkToken();
    }, [navigate]);

    return (
        <>
            <div id="loginPage" className="bg-yellow">
                <div className="conatiner loginPage vhContainer ">
                    <div className="side">
                        <Link to="/">
                            <img className="d-m-n" src="./images/bg.png" alt="workImg" />
                        </Link>
                    </div>
                    <div>
                        {location.pathname === '/' || location.pathname === '/login' ? (
                            <LoginForm />
                        ) : (
                            <RegiRegisterFormster />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginLayout;
