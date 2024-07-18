import { ReturnValidate } from "../../data/types/authTypes";

// Function for verify valid username
export const verifyUsername = (username: string): ReturnValidate => {
    const regex = /^[a-zA-Z0-9._]{3,16}$/;
    const isValid = regex.test(username);

    if (isValid){
        return {
            valid: true,
            error: null,
            errorFor: null
        }
    }else{
        return {
            valid: false,
            error: "Username must be between 3 and 16 characters long, contain only alphanumeric characters, underscores, and periods.",
            errorFor: "username"
        }
    }
}