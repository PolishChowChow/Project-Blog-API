import { ReturnedAuthorType } from "./AuthorType"
import { ExtendedPostProps, like } from "./PostProps"

export type CommentType = {
    _id: string
    content: string
    author: ReturnedAuthorType
    post: ExtendedPostProps
    createdAt: Date
    likes: like[]
}