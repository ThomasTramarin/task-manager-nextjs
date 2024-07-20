//Return validate user credentials functions
export type ReturnValidate = {
    valid: boolean;
    error: string | null;
    errorFor: string | null;
}

//Register validatio error array type
export type RegisterValidationErrors = {
    errorFor: string | null;
    error: string | null;
}[]



//Register body POST type
export type RegisterBody = {
    username: string;
    email: string;
    password: string;
    repeatPassword: string
}

//FormErrors component prop
export type FormErrorProp = {errorFor: string, error: string}