import { ReturnValidate } from "../../data/types/authTypes";

// Function for verify valid password
export const verifyPassword = (password: string): ReturnValidate => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/;
    const isValid = regex.test(password);

    if (isValid){
        return {
            valid: true,
            error: null,
            errorFor: null,
        }
    }else{
        return {
            valid: false,
            error: "Password must be between 8 and 50 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).",
            errorFor: "password"
        }
    }
}