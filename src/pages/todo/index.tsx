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
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus } from "lucide-react";
import AddTodoForm from "@/components/AddTodoForm";
import TodoView from "@/components/TodoView";
import { api } from "@/utils/api";
import TodoFallback from "@/components/TodoFallback";
import { useState } from "react";

const TodoPage: MyPage = () => {
  const [closeInfo, setCloseInfo] = useState(false);
  const todos = api.todo.getTodos.useQuery();

  const { data: todoData, isLoading } = todos;

  if (isLoading) {
    return <TodoFallback />;
  }

  return (
    <>
      <div className="p-4 sm:ml-64">
        <Card className="mt-16 rounded-lg p-0">
          <CardHeader>
            <CardTitle>To-Do Listesi</CardTitle>
            <CardDescription>
              Aşağıda eklemiş olduğunuz To-Do&rsquo;ların listesini
              görebilirsiniz.
              {!closeInfo && (
                <div className="w-3/3 my-4 flex rounded-lg bg-sky-50 p-4 text-sm text-blue-800 drop-shadow-md transition-all dark:bg-gray-800 dark:text-red-400 md:w-2/5 lg:w-2/5">
                  <svg
                    className="mr-3 mt-[2px] inline h-4 w-4 flex-shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <div className="transition-transform duration-200">
                    <div className="flex justify-between">
                      <span className="font-medium">
                        To-Do ile ilgili detayları görmek için ilgili
                        To-Do&rsquo;ya tıklayınız.
                      </span>
                      <span
                        className="relative ml-4 flex h-3 w-3 cursor-pointer"
                        onClick={() => setCloseInfo(!closeInfo)}
                      >
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-500 text-sm text-white hover:bg-blue-300"></span>
                      </span>
                    </div>
                  </div>
                </div>
              )}
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
              <AlertDialogContent className="h-[550px] overflow-y-scroll sm:max-w-[425px] md:max-w-[650px] lg:max-w-[750px]">
                <AlertDialogHeader>
                  <AlertDialogTitle>To-Do Ekle</AlertDialogTitle>
                  <AlertDialogDescription>
                    Aşağıdaki formu doldurarak yeni bir To-Do ekleyebilirsiniz.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AddTodoForm />
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-red-500 text-white hover:bg-red-400 hover:text-white">
                    KAPAT
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            {todoData?.map((todo) => <TodoView key={todo.id} todos={todo} />)}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default TodoPage;
TodoPage.Layout = "TodoPage";
