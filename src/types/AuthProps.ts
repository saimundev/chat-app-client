export interface SignUpProps{
    name:string
    email:string
    password:string
}

export interface SignInProps{
    email:string
    password:string
}

export interface EmailVerifyProps{
    token:string
}