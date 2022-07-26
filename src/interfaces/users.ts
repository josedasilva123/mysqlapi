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

export interface LoginSucessResponse{
    message: string;
    data: CurrentUser;
}

export interface LoginErrorResponse{
    error: string;
}