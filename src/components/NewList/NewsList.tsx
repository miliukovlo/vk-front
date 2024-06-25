import React, { useEffect, useRef, useState } from 'react';
import './NewsListStyle.css'
import { getNews } from '../../hooks/getNews';
import { newsType } from '../../Types/newsType';
import Loading from '../Common/Loading/Loading';
import News from '../News/News';

const NewsList: React.FC = () => {

    const [news, setNews] = useState<newsType[]>([])
    const [newsLength, setNewsLength] = useState<number>(15)
    const [loading, setLoading] = useState<boolean>(true)
    const observer = useRef<IntersectionObserver | null>(null)
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [sorted, setSorted] = useState<string>('beststories')

    const sortedNews = (value: string) => {
        setSorted(value)
        setNewsLength(15)
        setLoading(true)
    }
    const refreshNews = async () => {
        setNewsLength(15)
        setLoading(true)
        try {
            const newNewsList = await getNews(newsLength, sorted)
            setNews(newNewsList)
            setLoading(false)
        } catch (e) {
            console.error('Ошибка при получении новостей', e)
            setLoading(false)
        }
    }

    useEffect(() => {
        const getNewsForList = async () => {
            try {
                const newNewsList = await getNews(newsLength, sorted)
                setNews(newNewsList)
                setLoading(false)
            } catch (e) {
                console.error('Ошибка при получении новостей', e)
                setLoading(false)
            }
        }
        getNewsForList()

    }, [newsLength, sorted])

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const newNewsList = await getNews(newsLength, sorted)
                setNews(newNewsList)
                setLoading(false)
            } catch (e) {
                console.error('Ошибка при получении новостей', e)
                setLoading(false)
            }
        }, 30000)
        return () => clearInterval(interval)
    }, [newsLength, sorted])

    useEffect(() => {

        observer.current = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setNewsLength(prevLimit => prevLimit + 15);
                }
            });
        });

        if (contentRef.current) {
            observer.current.observe(contentRef.current);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [])

    return (
        <>
            <main className='news-list__content'>
            <select name="" id="" value={sorted} onChange={(event) => sortedNews(event.target.value)}>
                <option value="beststories">Лучшие истории</option>
                <option value="topstories">Топ историй</option>
                <option value="newstories">Новые истории</option>
            </select>
            <button className='news-list__button' style={{marginTop: '10px'}} onClick={refreshNews}>Обновить истории!</button>

                {loading ? 
                    <Loading/>
                :
                    news.map(singleNews => {
                        return (
                            <News
                                key={singleNews.id}
                                title={singleNews.title}
                                by={singleNews.by}
                                score={singleNews.score}
                                url={singleNews.url}
                                kids={singleNews.kids}
                            />
                        )
                    })
                }
            </main>
            <div ref={contentRef} className="news-list__observer"></div>
        </>
    );
}

export default NewsList;
