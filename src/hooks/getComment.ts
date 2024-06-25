import { commentType } from "../Types/commentType"

export const getComment = async (allComments: number[]) => {
    try {
        let comments: commentType[] = []
        for (let i = 0; i < allComments.length; i++) {
            const commentResponse: Response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${allComments[i]}.json?print=pretty`)
            const comment: commentType = await commentResponse.json()
            comments.push(comment)
        }
        return comments
    } catch (e) { 
        console.error(e)
    }
}