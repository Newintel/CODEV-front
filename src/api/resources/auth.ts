export interface I_LoginRequest {
    email: string;
    password: string;
}

export interface I_NFCLoginRequest {
    nfc: string;
}

export interface I_LoginResponse {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
    token_type?: string;
    type?: string;
    error?: string;
    error_description?: string;
    error_code?: number;
}

export interface I_SignupResponse {
    email: string;
    sent_at: string;
}
