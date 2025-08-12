import type {Metadata} from "next";
import SignInForm from "@/components/auth/SignInForm";

export const metadata: Metadata = {
    title: "Sign in & Sign up",
}

export default function SignIn() {
    return <SignInForm/>
}
