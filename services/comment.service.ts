import { CreateCommentRequest } from "@/models/create_comment_request.dto";
import { baseApiService } from "./base.service";
import { ApiResponse } from "@/models/api_response";
import { UpdateCommentRequest } from "@/models/update_comment_request.dto";
import { DeleteCommentResponse } from "@/models/delete_comment_response.dto";


class CommentServiceClass {
    private static instance: CommentServiceClass;

    private constructor() { }

    static getInstance(): CommentServiceClass {
        if (!CommentServiceClass.instance) {
            CommentServiceClass.instance = new CommentServiceClass();
        };

        return CommentServiceClass.instance;
    };

    public async createComment(payload: CreateCommentRequest): Promise<ApiResponse<Comment>> {
        return baseApiService.post<Comment>('/comment', { body: payload });
    }

    public async getCommentsByPostId(postId: string): Promise<ApiResponse<Comment[]>> {
        return baseApiService.get<Comment[]>(`/comment/post/${postId}`);
    }

    public async getCommentById(id: string): Promise<ApiResponse<Comment>> {
        return baseApiService.get<Comment>(`/comment/${id}`);
    }

    public async updateComment(id: string, content: string): Promise<ApiResponse<Comment>> {
        const payload: UpdateCommentRequest = { content };
        return baseApiService.put<Comment>(`/comment/${id}`, { body: payload });
    }

    public async deleteComment(id: string): Promise<ApiResponse<DeleteCommentResponse>> {
        return baseApiService.delete<DeleteCommentResponse>(`/comment/${id}`);
    }
};

export const commentService = CommentServiceClass.getInstance();