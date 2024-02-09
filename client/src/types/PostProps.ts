import { ReturnedAuthorType } from "./AuthorType"

export type PostProps = {
    title: string,
    content: string
}
export type ExtendedPostProps = PostProps & {
    _id: string,
    author: ReturnedAuthorType
    is_published: boolean,
    createdAt: Date,
    likes: like[],
    url: string,
    comments_url: string,
}
export type like = string;

export type PostListType = ExtendedPostProps[]