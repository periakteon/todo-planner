import { type MyPage } from "@/components/layouts/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus } from "lucide-react";

const TodoPage: MyPage = () => {
  return (
    <>
      <div className="p-4 sm:ml-64">
        <Card className="mt-16 rounded-lg p-0">
          <CardHeader>
            <CardTitle>To-Do Listesi</CardTitle>
            <CardDescription>
              Aşağıda eklemiş olduğunuz To-Do&rsquo;ların listesini
              görebilirsiniz.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="mb-4 w-full justify-start text-left text-lg font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  variant="outline"
                >
                  <Plus className="mr-2 inline" strokeWidth={3} />
                  To-Do Ekle
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="sm:max-w-[425px] md:max-w-[500px] lg:max-w-[600px]">
                <AlertDialogHeader>
                  <AlertDialogTitle>To-Do Ekle</AlertDialogTitle>
                  <AlertDialogDescription>
                    Aşağıdaki formu doldurarak yeni bir To-Do ekleyebilirsiniz.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-red-500 text-white hover:bg-red-400 hover:text-white">
                    Vazgeç
                  </AlertDialogCancel>
                  <AlertDialogAction className="bg-purple-500 text-white hover:bg-purple-400 hover:text-white">
                    Kaydet
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default TodoPage;
TodoPage.Layout = "TodoPage";
