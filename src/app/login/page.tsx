import GoogleLoginButton from "@/components/GoogleLoginButton";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <GoogleLoginButton />
    </div>
  );
}
