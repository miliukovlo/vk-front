import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../../../layouts/MainLayout';
import NewsListPage from '../../../pages/NewsListPage';
import CommentPage from '../../../pages/CommentPage';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainLayout/>}>
                    <Route path='/' element={<NewsListPage/>}/>
                    <Route path='/:id' element={<CommentPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
