import React from 'react';
import './NewsStyle.css'
import { Link } from 'react-router-dom';

interface NewsProps {
    title: string,
    by: string,
    score: number,
    url: string,
    kids: number[]
}

const News: React.FC<NewsProps> = React.memo(({
    title,
    by,
    score,
    url,
    kids
}) => {
    return (
        <div className='news-block'>
            <h1 className="news-block__title">{title}</h1>
            <h3 className='news-block__author'>Автор: {by}</h3>
            <p className="news-block__info">Оценка: {score}</p>
            <p className="news-block__info">URL: {url ? <Link className='news-block__link' to={url}>{url}</Link> : 'Ссылка отсутствует'}</p>
        </div>
    );
})

export default News;
