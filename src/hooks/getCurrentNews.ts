import { newsType } from "../Types/newsType"

export const getCurrentNews = async (newsId: string | undefined): Promise<newsType | undefined> => {
    try {
        const currentNewsRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`)
        const currentNews = await currentNewsRes.json()
        return currentNews
    } catch (e) {
        console.error(e)
    }
}