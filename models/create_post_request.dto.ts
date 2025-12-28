export interface CreatePostRequest {
    content: string;
    location_id: string;
    visibility: 'PUBLIC' | 'PRIVATE' | 'FRIENDS';
}