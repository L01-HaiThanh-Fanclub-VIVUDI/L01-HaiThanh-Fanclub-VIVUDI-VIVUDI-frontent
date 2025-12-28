import { PostMedia } from "./post_media.dto";

export interface Post {
    id: string;
    content: string;
    author_id: string;
    visibility: 'PUBLIC' | 'PRIVATE' | 'FRIENDS';
    location_id: string;
    rating?: number | null;
    createdAt: string;
    updatedAt: string;
    medias: PostMedia[];
    author?: {
        id: string;
        display_name: string;
        avt_url: string;
    };
    location?: {
        id: string;
        name: string;
        address: string;
        type: string;
    };
    comments?: any[];
}