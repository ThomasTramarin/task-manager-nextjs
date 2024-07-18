export type ReturnValidate = {
    valid: boolean;
    error: string | null;
    errorFor: string | null;
}

export type ValidationErrors = {
    errorFor: string | null;
    error: string | null;
}[]


export type ErrorProp = {errorFor: string, error: string}