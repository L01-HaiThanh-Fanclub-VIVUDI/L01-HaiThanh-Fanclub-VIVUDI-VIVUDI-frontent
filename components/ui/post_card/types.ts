export interface PostCardProps {
    id: string;
    username: string;
    location: string;
    avatar: any;
    image: any; // For backward compatibility
    images?: any[]; // Array of images for carousel
    likes: string;
    likedBy: string;
    caption: string;
    date: string;
    imageCount: string;
    isVerified: boolean;
}