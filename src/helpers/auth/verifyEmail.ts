import { ReturnValidate } from "../../data/types/authTypes";

// Function for verify valid email
export const verifyEmail = (email: string): ReturnValidate => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = regex.test(email);

    if (isValid){
        return {
            valid: true,
            error: null,
            errorFor: null,
        }
    }else{
        return {
            valid: false,
            error: "Email must be valid.",
            errorFor: "email"
        }
    }
}