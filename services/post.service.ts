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

        formData.append('data', JSON.stringify(payload));

        if (mediaUris && mediaUris.length > 0) {
            mediaUris.forEach((uri, index) => {
                const filename = uri.split('/').pop() || `media_${index}`;
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : `image`;

                formData.append('media', {
                    uri,
                    name: filename,
                    type
                } as any);
            });
        }
        console.log(formData);

        return baseApiService.post<Post>('/post', {
            body: formData
        });
    }

    public async getPostById(id: string): Promise<ApiResponse<Post>> {
        return baseApiService.get<Post>(`/post/${id}`);
    }

    public async getAllPosts(page: number = 1, limit: number = 10): Promise<ApiResponse<{
        data: Post[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
    }>> {
        return baseApiService.get(`/post?page=${page}&limit=${limit}`);
    }
};

export const postService = PostServiceClass.getInstance();