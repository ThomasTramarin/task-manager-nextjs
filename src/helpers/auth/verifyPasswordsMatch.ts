import { ReturnValidate } from "../../data/types/authTypes";

// Function for verify passwords matching
export const verifyPasswordsMatch = (password: string, repeatPassword: string): ReturnValidate => {
    const isValid = password === repeatPassword;

    if (isValid){
        return {
            valid: true,
            error: null,
            errorFor: null
        }
    }else{
        return {
            valid: false,
            error: "Passwords do not match.",
            errorFor: "repeatPassword"
        }
    }
}