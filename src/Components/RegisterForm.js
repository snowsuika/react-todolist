import { useForm } from "react-hook-form";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { hasToken } from '../mixin';


const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    const onRegister = async (form) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_URL_DOMAIN}users`, { user: form });

            if (response.status === 201) {
                localStorage.setItem('token', response?.headers?.authorization.split('Bearer')[1].trim());
                localStorage.setItem('userInfo', JSON.stringify(response?.data));

                if (hasToken) {
                    navigate('/todolist');
                } else {
                    throw new Error('權限錯誤');
                }
            }
        } catch (error) {
            window.alert(error?.response?.data?.message);
        }
    };

    return (
        <>
            <form className="formControls"onSubmit={handleSubmit(onRegister)}>
                <h2 className="formControls_txt">註冊帳號</h2>
                <label className="formControls_label" htmlFor="email">
                    Email
                </label>
                <input
                    className="formControls_input"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="請輸入 email"
                    {...register("email", { required: true })}
                />
                <span >{ errors.email && '此欄位不可為空' }</span>
                <label className="formControls_label" htmlFor="nickname">
                    您的暱稱
                </label>
                <input
                    className="formControls_input"
                    type="text"
                    name="nickname"
                    id="nickname"
                    placeholder="請輸入您的暱稱"
                    {...register("nickname", { required: true })}
                />
                <span >{ errors.nickname && '此欄位不可為空' }</span>
                <label className="formControls_label" htmlFor="pwd">
                    密碼
                </label>
                <input
                    className="formControls_input"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="請輸入密碼"
                    {...register("password", { required: true })}
                />
                <span >{ errors.password && '此欄位不可為空' }</span>
                <label className="formControls_label" htmlFor="confirmPassword">
                    再次輸入密碼
                </label>
                <input
                    className="formControls_input"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="請再次輸入密碼"
                    {...register("confirmPassword", {
                      required: true,
                      validate: val => watch('password') === val || '密碼不正確'
                  })}
                />
                <span>{errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}</span>
                <input type="submit" className="formControls_btnSubmit" value="註冊帳號" />
                <Link className="formControls_btnLink" to="/login">
                    登入
                </Link>
            </form>
        </>
    );
};

export default Register;
