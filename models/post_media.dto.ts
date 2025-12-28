export interface PostMedia {
    id: string;
    url: string;
    type: 'IMAGE' | 'VIDEO';
    order: number;
    thumbnail_url?: string;
}