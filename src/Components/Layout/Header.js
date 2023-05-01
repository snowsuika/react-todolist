import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        // get UserInfo
        let { email, nickname } = JSON.parse(localStorage.getItem('userInfo'));
        setUserInfo({ email, nickname });
    }, []);

    const onSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        if (!localStorage.getItem('token')) {
            navigate('/');
        }
    };

    return (
        <>
            <nav>
                <h1>
                    <Link to="/"></Link>
                </h1>
                <ul>
                    <li className="todo_sm">
                        <span>{userInfo.nickname} 的代辦</span>
                    </li>
                    <li>
                        <button className="clear_btn_style" type="button" onClick={onSignOut}>
                            登出
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Header;
