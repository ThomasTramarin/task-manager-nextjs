import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import util from "util";
import db from "../lib/db";

const query = util.promisify(db.query).bind(db);

export const authOptions = {
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {
          email: {
            label: "Email",
            type: "email",
            placeholder: "email@example.com",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          if (!credentials) {
            throw new Error("Missing credentials");
          }
  
          const { email, password } = credentials as {
            email: string;
            password: string;
          };
  
          try {
            // Check if user exists
            const users = await query("SELECT * FROM users WHERE email = ?", [
              email,
            ]);
            const user = users[0];

            if (user) {
              // Check password
              const isPasswordCorrect = await bcrypt.compare(
                password,
                user.password
              );
  
              if (isPasswordCorrect) {
                return user;
              } else {
                throw new Error("Invalid credentials");
              }
            } else {
              throw new Error("User not found");
            }
          } catch (err: any) {
            throw new Error(err);
          }
        },
      }),
    ],
    pages: {
      error: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token, user }: { token: any; user?: any }) {
        // Add user id to the token
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.username = user.username;
        }
        return token;
      },
      async session({ session, token }: { session: any; token: any }) {
        // Add the user id to the session
        if (token) {
          session.user.id = token.id;
          session.user.email = token.email;
          session.user.username = token.username;
        }
        return session;
      },
    },
    
  };