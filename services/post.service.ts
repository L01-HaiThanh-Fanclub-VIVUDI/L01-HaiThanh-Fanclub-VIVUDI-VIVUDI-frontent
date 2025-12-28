import { ApiResponse } from "@/models/api_response";
import { CreatePostRequest } from "@/models/create_post_request.dto";
import { Post } from "@/models/post.dto";
import { baseApiService } from "./base.service";

class PostServiceClass {
    private static instance: PostServiceClass;

    private constructor() { }

    static getInstance(): PostServiceClass {
        if (!PostServiceClass.instance) {
            PostServiceClass.instance = new PostServiceClass();
        };

        return PostServiceClass.instance;
    };

    public async createPost(
        payload: CreatePostRequest,
        mediaUris: string[] = []
    ): Promise<ApiResponse<Post>> {
        const formData = new FormData();

        // Append JSON payload as string
        formData.append('data', JSON.stringify(payload));

        // Append media files using React Native format
        if (mediaUris && mediaUris.length > 0) {
            mediaUris.forEach((uri, index) => {
                const filename = uri.split('/').pop() || `media_${index}`;
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : `image`;

                formData.append('media', {
                    uri,
                    name: filename,
                    type,
                } as any);
            });
        }

        return baseApiService.post<Post>('/post', {
            body: formData
        });
    }

    public async getPostById(id: string): Promise<ApiResponse<Post>> {
        return baseApiService.get<Post>(`/post/${id}`);
    }

    public async getAllPosts(): Promise<ApiResponse<Post[]>> {
        return baseApiService.get<Post[]>('/post');
    }
};

export const postService = PostServiceClass.getInstance();