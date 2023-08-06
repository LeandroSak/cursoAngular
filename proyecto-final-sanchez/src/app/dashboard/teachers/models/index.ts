export interface Teacher {
    id:number
    name:string,
    lastname:string,
    email:string,
}

export interface createTeacher{
    name:string,
    lastname:string,
    email:string,
}

export interface updateTeacher{
    name?:string,
    lastname?:string,
    email?:string,
}
