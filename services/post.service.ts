import { CreatePostRequest } from "@/models/create_post_request.dto";
import { baseApiService } from "./base.service";
import { ApiResponse } from "@/models/api_response";
import { Post } from "@/models/post.dto";

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
        mediaFiles: File[]
    ): Promise<ApiResponse<Post>> {
        const formData = new FormData();

        const jsonPayload = JSON.stringify(payload);
        formData.append('data', jsonPayload);

        if (mediaFiles && mediaFiles.length > 0) {
            mediaFiles.forEach((file) => {
                formData.append('media', file);
            });
        }

        return baseApiService.post<Post>('/post', {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        });
    }

    public async getPostById(id: string): Promise<ApiResponse<Post>> {
        return baseApiService.get<Post>(`/post/${id}`);
    }
};

export const postService = PostServiceClass.getInstance();