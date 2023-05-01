import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        email       : '',
        password    : '',
    });

    const onLogin = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_URL_DOMAIN}users/sign_in`, { user: userInfo });
            if (response.status === 200) {
                localStorage.setItem('token', response?.headers?.authorization.split('Bearer')[1].trim());
                localStorage.setItem('userInfo', JSON.stringify(response?.data));
                navigate('/todolist');
            }
        } catch (error) {
            window.alert(error?.response?.data?.message);
        }
    };

    return (
        <>
            <form className="formControls" action="index.html">
                <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
                <label className="formControls_label" htmlFor="email">
                    Email
                </label>
                <input
                    className="formControls_input"
                    type="text"
                    id="email"
                    name="email"
                    placeholder="請輸入 email"
                    value={userInfo.email}
                    onChange={(e) =>
                        setUserInfo({
                            ...userInfo,
                            email: e.target.value,
                        })
                    }
                    required
                />
                <label className="formControls_label" htmlFor="pwd">
                    密碼
                </label>
                <input
                    className="formControls_input"
                    type="password"
                    name="pwd"
                    id="pwd"
                    placeholder="請輸入密碼"
                    value={userInfo.password}
                    onChange={(e) =>
                        setUserInfo({
                            ...userInfo,
                            password: e.target.value,
                        })
                    }
                    required
                />
                <input className="formControls_btnSubmit" type="button" value="登入" onClick={onLogin} />
                <Link className="formControls_btnLink" to="/register">
                    註冊帳號
                </Link>
            </form>
        </>
    );
};

export default LoginForm;
