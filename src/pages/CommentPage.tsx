import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrentNews } from '../hooks/getCurrentNews';
import { newsType } from '../Types/newsType';
import Loading from '../components/Common/Loading/Loading';
import './CommentPage.style.css'
import { getComment } from '../hooks/getComment';
import { commentType } from '../Types/commentType';

const CommentPage = () => {
    const { id } = useParams();
    const [news, setNews] = useState<newsType | null>(null);
    const [comments, setComments] = useState<commentType[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentNews = await getCurrentNews(id);
                if (currentNews) {
                    setNews(currentNews);
                    setLoading(false);
                    const commentsFind = await getComment(currentNews.kids); // Добавляем await здесь
                    if (commentsFind) {
                        setComments(commentsFind);
                    }
                } else {
                    setNews(null);
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, [id]);

    return (
        <main className='comment-page__content'>
            {loading ? 
                    <Loading/>
                    :
                    news && 
                    <>
                        <h1 className="comment-page__title">{news.title}</h1>
                        <h3 className='comment-page__title'>Комментарии:</h3>
                        {comments.map((com: commentType) => {
                            return(
                                <div className="comment-block">
                                    <h1>{com.by}</h1>
                                    <h3>{com.text}</h3>
                                    <p>{com.score}</p>
                                    <p>{com.kids}</p>
                                </div>
                            )
                        })}
                    </>
            }
        </main>
    );
}

export default CommentPage;
