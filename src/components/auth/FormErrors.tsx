import { ErrorProp } from "../../data/types/authTypes";

//Component for displaying errors
export default function FormErrors({ errorFor, errors }: { errorFor: string, errors: ErrorProp[] }): JSX.Element {
    //Find error 
    const relevantErrors = errors?.filter((error: ErrorProp) => error.errorFor === errorFor) || [];

    //Display error
    return (
        <div className="text-red-500 font-medium text-xs mt-1">
            {relevantErrors.map((relevantError) => (`${relevantError.error}`))}
        </div>
    );
}