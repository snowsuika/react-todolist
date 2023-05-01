import axios from 'axios';

// Create axios instance
const api = axios.create({
    baseURL: process.env.REACT_APP_URL_DOMAIN,
    headers: {
        Accept            : 'application/json',
        'Content-Type'    : 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else if (error.request) {
            throw new Error('No response received from server');
        } else {
            throw new Error(error.message);
        }
    }
);

const apis = {
    /**
     *
     * @returns Array Todolist 清單
     */
    getTodoList: () => api.get('/todos'),
    /**
     *
     * @param {*} 要新增 todo 的內容
     * @returns
     */
    AddTodo: (parameters) => api.post('/todos', parameters),
    /**
     *
     * @param {*} id : 要更新的項目 id
     * @param {*} parameters : body 內容
     * @returns
     */
    updateTodo: (id, parameters) => api.put(`/todos/${id}`, parameters),
    /**
     *
     * @param {*} id : item id
     * @returns
     */
    deleteTodo: (id) => api.delete(`/todos/${id}`),
    /**
     *
     * @param {*} id :item id
     * @returns
     */
    toogleDoneTodo: (id) => api.patch(`/todos/${id}/toggle`),
};

export default apis;
