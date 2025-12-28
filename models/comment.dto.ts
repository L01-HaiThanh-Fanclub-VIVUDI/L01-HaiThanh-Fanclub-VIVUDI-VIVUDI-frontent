import { CommentUser } from "./comment_user.dto";

export interface Comment {
    id: string;
    content: string;
    post_id: string;
    user_id: string;
    parent_id: string | null;
    createdAt: string;
    updatedAt: string;
    user?: CommentUser;
    post?: {
        id: string;
        content: string;
    };
    child_comments?: Comment[];
}