import { SignUp } from "@clerk/remix";

export default function CatchAllSignUp() {
  return <SignUp routing="path" path="/sign-up" />;
}
