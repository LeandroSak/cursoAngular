export interface Student {
    id:number
    name:string,
    lastname:string,
    email:string,
    age:number
}

export interface createStudent{
    name:string,
    lastname:string,
    email:string,
    age:number
}

export interface updateStudent{
    name?:string,
    lastname?:string,
    email?:string,
    age?:number
}
