import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { ArrowLeftCircle, ShieldAlert } from "lucide-react";
import { useRouter } from "next/router";

export default function NotLoggedIn() {
  const router = useRouter();
  const { pathname } = router;
  return (
    <div
      className="
  flex
  h-screen
  w-screen
  items-center
  justify-center
  bg-gradient-to-r
  from-indigo-600
  to-purple-500
"
    >
      <div className="relative rounded-md bg-white px-20 py-20 shadow-xl">
        <ArrowLeftCircle
          className="absolute left-4 top-4 cursor-pointer text-gray-400 hover:text-gray-300"
          size={36}
          onClick={() => void router.back()}
        />
        <div className="flex flex-col items-center">
          <ShieldAlert color="red" size={100} />

          <h6 className="mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl">
            <span className="text-red-500">UYARI</span>
          </h6>

          <p className="mb-8 text-center text-gray-500 md:text-lg">
            Bu sayfayı görüntülemek için giriş yapmanız gerekmektedir.
          </p>

          <SignInButton mode="modal" afterSignInUrl={`${pathname}`}>
            <Button variant={"purple"}>Giriş Yap</Button>
          </SignInButton>
        </div>
      </div>
    </div>
  );
}
