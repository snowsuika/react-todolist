import axios from 'axios';

export const hasToken = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${process.env.REACT_APP_URL_DOMAIN}check`, {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });

    return response?.status === 200 ? true : false;
};
