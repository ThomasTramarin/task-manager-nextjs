import { FormErrorProp } from "../../data/types/authTypes";

//Component for displaying errors
export default function FormErrors({ errorFor, errors }: { errorFor: string, errors: FormErrorProp[] }): JSX.Element {
    //Find error 
    const relevantErrors = errors?.filter((error: FormErrorProp) => error.errorFor === errorFor) || [];

    //Display error
    return (
        <div className="text-red-500 font-medium text-xs mt-1">
            {relevantErrors.map((relevantError) => (`${relevantError.error}`))}
        </div>
    );
}