import { NextResponse } from "next/server";
import { ValidationErrors } from "../../../../data/types/authTypes";

import { verifyUsername } from "../../../../helpers/auth/verifyUsername";
import { verifyEmail } from "../../../../helpers/auth/verifyEmail";
import { verifyPassword } from "../../../../helpers/auth/verifyPassword";
import { verifyPasswordsMatch } from "../../../../helpers/auth/verifyPasswordsMatch";

import util from "util";
import db from "../../../../lib/db";
import bcrypt from "bcrypt";

const query = util.promisify(db.query).bind(db);

//API request for registraton
export async function POST(req: Request) {
  //Body values
  const { username, email, password, repeatPassword } = await req.json();
    
  let validationErrors: ValidationErrors = [];
  
  //Check validate user inputs
  const validUsername = verifyUsername(username);
  const validEmail = verifyEmail(email);
  const validPassword = verifyPassword(password);
  const validPasswordMatch = verifyPasswordsMatch(password, repeatPassword);

  if(!validUsername.valid) validationErrors.push({errorFor: validUsername.errorFor, error: validUsername.error})
  if(!validPassword.valid) validationErrors.push({errorFor: validPassword.errorFor, error: validPassword.error})
  if(!validEmail.valid) validationErrors.push({errorFor: validEmail.errorFor, error: validEmail.error})
  if(!validPasswordMatch.valid) validationErrors.push({errorFor: validPasswordMatch.errorFor, error: validPasswordMatch.error})


  if(validationErrors.length > 0){
    //If there are errors
    return NextResponse.json({ success: false, errors: validationErrors }, {status: 400});
  }else{
    //Check if user already exists in the database
    const emailAlreadyRegistered = await query("SELECT * FROM users WHERE email = ?", [email]);
    const usernameAlreadyRegistered = await query("SELECT * FROM users WHERE username = ?", [username]);

    if(emailAlreadyRegistered.length > 0) validationErrors.push({errorFor: "email", error: "Email already registered"})
    if(usernameAlreadyRegistered.length > 0) validationErrors.push({errorFor: "username", error: "Username already registered"})


    
    if(validationErrors.length > 0){
        //If user already exists in the database
        return NextResponse.json({ success: false, errors: validationErrors }, {status: 400});
    }else{
        //If there are no errors, try to register the user in the database
        try{
            //Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            
            //Insert user into the database
            await query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hashedPassword])
            return NextResponse.json({ success: true }, {status: 201})
        }catch(err){
            return NextResponse.json({success: false}, {status: 500})
        }
    }
  }
}
