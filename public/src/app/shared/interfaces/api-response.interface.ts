export interface StandardResponse {
    success: boolean;
    message: string;
}

export interface AuthentificateResponse {
    success: boolean;
    token: string;
    error: string;
}

export interface UploadResponse {
    success: boolean;
    finished: boolean;
    file: string;
    message?: string;
}
