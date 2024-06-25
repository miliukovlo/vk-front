import React, { useState, useEffect } from 'react';
import './NewsStyle.css'
import { Link } from 'react-router-dom';
import { getComment } from '../../hooks/getComment';
import { commentType } from '../../Types/commentType';

interface NewsProps {
    title: string,
    by: string,
    score: number,
    url: string,
    kids: number[],
    id: number
}

const News: React.FC<NewsProps> = React.memo(({
    title,
    by,
    score,
    url,
    kids,
    id
}) => {

    const [comments, setComments] = useState<commentType[]>([]);

    useEffect(() => {
        console.log(comments)
        const fetchComments = async () => {
            try {
                const commentsData = await getComment(kids);
                setComments(commentsData || []);
            } catch (error) {
                console.error('Ошибка при получении комментариев', error);
            }
        };
        fetchComments();
    }, [comments, kids]);

    return (
        <div className='news-block'>
            <h1 style={{cursor: 'pointer'}} className="news-block__title"><Link to={url} className='news-block__title-link'>{title}</Link></h1>
            <h3 className='news-block__author'>Автор: {by}</h3>
            <p className="news-block__info">Оценка: {score}</p>
            <p className="news-block__info">URL: {url ? <Link className='news-block__link' to={url}>{url}</Link> : 'Ссылка отсутствует'}</p>
            <p className="news-block__info">Комментарий: <Link to={`/${id}`} className='news-block__link'>{comments.length > 0 ? comments[0].text : 'Комментарии отсутствуют'}</Link></p>
        </div>
    );
})

export default News;
