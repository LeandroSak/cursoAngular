export interface User {
    id:number
    name:string,
    lastname:string,
    email:string,
    password:string
}

export interface createUser{
    name:string,
    lastname:string,
    email:string,
    password:string
}

export interface updateUser{
    name?:string,
    lastname?:string,
    email?:string,
    password?:string
}
