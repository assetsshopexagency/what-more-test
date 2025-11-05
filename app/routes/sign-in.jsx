// app/routes/sign-in.jsx
import { json } from "@remix-run/node";
import { SignIn } from "@clerk/remix";

export const loader = async () => {
  return json({});
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign In</h1>
        <SignIn 
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          redirectUrl="/app"
        />
      </div>
    </div>
  );
}