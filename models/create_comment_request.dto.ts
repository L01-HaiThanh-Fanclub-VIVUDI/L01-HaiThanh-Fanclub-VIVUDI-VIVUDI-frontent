export interface CreateCommentRequest {
    content: string;
    post_id: string;
    parent_id?: string | null;
}