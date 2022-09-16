export interface RegisterBody{
    name: string;
    email: string;
    password: string;
}

export interface LoginBody{
    email: string;  
    password: string;
}

export interface CurrentUser{
    name: string;
    email: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
}

interface LoginSucessResponseData{
    user: CurrentUser;
    token: string;
}

export interface LoginSucessResponse{
    message: string;
    data: LoginSucessResponseData;
}

export interface LoginErrorResponse{
    error: string;
}