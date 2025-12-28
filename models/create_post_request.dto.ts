export interface CreatePostRequest {
    content: string;
    location_id: string;
    visibility: 'PUBLIC' | 'PRIVATE' | 'FRIENDS';
    rating?: number; // Optional 1-5 star rating
}