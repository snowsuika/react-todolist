import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import Todolist from './pages/Todolist';
import LoginLayout from './pages/LoginLayout';

// Component
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={<LoginLayout />}>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                </Route>
                <Route exact={true} path="/todolist" element={<Todolist />} />
                <Route path="/*" element={<LoginLayout />} />
            </Routes>
        </div>
    );
}

export default App;
