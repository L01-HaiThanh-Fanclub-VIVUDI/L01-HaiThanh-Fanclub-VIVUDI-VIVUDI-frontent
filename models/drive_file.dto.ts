export interface DriveFile {
    id: string;
    name: string;
    mimeType: string;
    size: string; 
    webViewLink: string; 
    webContentLink?: string; 
    directLink?: string; 
    folderId?: string;
}