import { ApiResponse } from "@/models/api_response";
import { DeleteDriveResponse } from "@/models/delete_drive_response.dto";
import { DriveFile } from "@/models/drive_file.dto";
import { VIVUDI_API_URL } from "@/settings";
import { baseApiService } from "./base.service";

class GoogleDriveServiceClass {
    private static instance: GoogleDriveServiceClass;

    private constructor() { }

    static getInstance(): GoogleDriveServiceClass {
        if (!GoogleDriveServiceClass.instance) {
            GoogleDriveServiceClass.instance = new GoogleDriveServiceClass();
        };

        return GoogleDriveServiceClass.instance;
    };

    public async uploadFile(folderId: string, file: File): Promise<ApiResponse<DriveFile>> {
        const formData = new FormData();
        formData.append('file', file);

        return baseApiService.post<DriveFile>(
            `/google-drive/upload/${folderId}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            }
        );
    }

    public async getDirectLink(fileId: string): Promise<ApiResponse<DriveFile>> {
        return baseApiService.get<DriveFile>(`/google-drive/direct-link/${fileId}`);
    }

    public async deleteFile(fileId: string): Promise<ApiResponse<DeleteDriveResponse>> {
        return baseApiService.post<DeleteDriveResponse>(`/google-drive/delete/${fileId}`, {});
    }

    public async getFileStream(fileId: string): Promise<any> {
        return baseApiService.get<any>(`/google-drive/file/${fileId}`, {
            responseType: 'blob'
        } as any);
    }

    public getDriveLink(fileId: string): string {
        return `${VIVUDI_API_URL}/google-drive/file/${fileId}`;
    }
};

export const googleDriveService = GoogleDriveServiceClass.getInstance();