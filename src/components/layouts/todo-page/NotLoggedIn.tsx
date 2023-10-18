import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { AlertCircle } from "lucide-react";

export default function NotLoggedIn() {
  return (
    <Alert
      variant="destructive"
      className="mx-auto mt-10 h-full w-2/3 sm:w-2/3 md:w-1/3"
    >
      <AlertCircle className="h-6 w-6" />
      <AlertTitle className="ml-2">HATA</AlertTitle>
      <AlertDescription className="ml-2">
        Bu sayfayı görüntülemek için giriş yapmanız gerekmektedir.
      </AlertDescription>
      <div className="mt-4 flex justify-center">
        <SignInButton mode="modal" afterSignInUrl="/home">
          <Button className="bg-green-600 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-600">
            Giriş Yap
          </Button>
        </SignInButton>
      </div>
    </Alert>
  );
}
