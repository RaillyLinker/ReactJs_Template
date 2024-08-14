import React from 'react';
import { Outlet } from 'react-router-dom';
import './app.css';
import './app_fonts.css';

// [함수형 컴포넌트 뷰]
const App: React.FC = () => {
    return (
        <div id="MainView">
            <Outlet />
        </div>
    );
};

export default App;