"use client"
import { useRouter } from 'next/navigation'

import Link from "next/link";
import { useFormState } from "react-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { registerUserAction } from "../../data/actions/registerUserAction";
import FormErrors from "./FormErrors";

const INITIAL_STATE = {
  success: null,
  errors: null,
  message: null
}

export default function RegisterForm() {
  const router = useRouter();
  const [formState, formAction] = useFormState(registerUserAction, INITIAL_STATE);

  //If login successful redirect to login page
  if(formState.success){
    router.push("/login");
  }

  return (
    <div className="flex flex-col rounded-lg bg-background-2 p-4 max-w-[400px]">
      <form action={formAction} method="POST" className="mb-3">
        <h1 className="text-3xl lg:text-4xl text-center">Create your account!</h1>

        <div className="mb-5">
          <Label htmlFor="username">Username:</Label>
          <Input type="text" maxLength={16} id="username" name="username" placeholder="_your.username_" required={true} aria-required={true}/>
          <FormErrors errorFor="username" errors={formState.errors}/>
        </div>
        <div className="mb-5">
          <Label htmlFor="email">Email:</Label>
          <Input type="email" maxLength={100} id="email" name="email" placeholder="email@example.com" required={true} aria-required={true}/>
          <FormErrors errorFor="email" errors={formState.errors}/>
        </div>
        <div className="mb-5">
          <Label htmlFor="password">Password:</Label>
          <Input type="password" maxLength={50} id="password" name="password" placeholder="••••••••••" required={true} aria-required={true}/>
          <FormErrors errorFor="password" errors={formState.errors}/>
        </div>
        <div className="mb-5">
          <Label htmlFor="repeatPassword">Repeat Password:</Label>
          <Input type="password" maxLength={50} id="repeatPassword" name="repeatPassword" placeholder="••••••••••" required={true} aria-required={true}/>
          <FormErrors errorFor="repeatPassword" errors={formState.errors}/>
        </div>
        <Input type="submit" value="Register" className="cursor-pointer dark:bg-purple dark:hover:bg-purple/80 font-medium"/>
        <FormErrors errorFor="server" errors={formState.errors}/>
      </form>
      <p className="text-sm">Already have an account? <Link href="/login" className="link">Login</Link></p>
    </div>
  );
}
