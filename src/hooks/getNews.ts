import { newsType } from "../Types/newsType";

export const getNews = async (newsLength: number, sorted: string) => {
    try {
        let news: newsType[] = []
        const newsIdResponse: Response = await fetch(`https://hacker-news.firebaseio.com/v0/${sorted}.json?print=pretty`);
        const newsId: number[] = await newsIdResponse.json();
        for (let i = 0; i < newsLength; i++) {
            try {
                const newsGetsById: Response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${newsId[i]}.json?print=pretty`);
                const newsData: newsType = await newsGetsById.json();
                news.push(newsData);
            } catch (error) {
                console.error('Ошибка при получении данных новости:', error);
            }
        }
        return news
    } catch (error: any) {
        throw new Error(error);
    }
};