import React, { useEffect, useState } from 'react';
import './NewsListStyle.css'
import { getNews } from '../../hooks/getNews';
import { newsType } from '../../Types/newsType';
import Loading from '../Common/Loading/Loading';

const NewsList: React.FC = () => {

    const [news, setNews] = useState<newsType[]>([])
    const [newsLength, setNewsLength] = useState<number>(30)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const getNewsForList = setInterval(async () => {
            try {
                const newNewsList = await getNews(newsLength)
                setNews(newNewsList)
                setLoading(false)
            } catch (e) {
                console.error('Ошибка при получении новостей', e)
                setLoading(false)
            }
        }, 1000)
        console.log(news)
        return () => {clearInterval(getNewsForList)}
    }, [newsLength])
    return (
        <main className='news-list__content'>
            {loading ? 
                <Loading/>
            :
                <h1>hi</h1>
            }
        </main>
    );
}

export default NewsList;
