import React from 'react';
import Header from '../components/Common/Header/Header';
import { Outlet } from 'react-router-dom';
import './MainLayoutStyle.css'

const MainLayout: React.FC = () => {
    return (
        <>
            <Header/>
            <div className="theme">
                <Outlet/>
            </div>
        </>
    );
}

export default MainLayout;
