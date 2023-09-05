export interface User {
    id:number
    name:string,
    lastname:string,
    email:string,
    password:string,
    token:string,
    role: 'ADMINISTRADOR' | 'USUARIO';
}

export interface createUser{
    name:string,
    lastname:string,
    email:string,
    password:string,
    role: string;

}

export interface updateUser{
    name?:string,
    lastname?:string,
    email?:string,
    password?:string,
    role?: string;
    token:string,
    
}
