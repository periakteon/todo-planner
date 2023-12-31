import {
  CalendarClock,
  ChevronDownIcon,
  FileEdit,
  FolderOpen,
  Tag,
  Trash2,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import useRgba from "@/hooks/useRgba";
import { api } from "@/utils/api";
import { toast } from "./ui/use-toast";
import format from "date-fns/format";
import { tr } from "date-fns/locale";
import { Checkbox } from "./ui/checkbox";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import UpdateTodoForm from "./UpdateTodoForm";
import PreviewTodo from "./PreviewTodo";

type Todo =
  | {
      id: string;
      title: string;
      content: string | null;
      isDone: boolean;
      category: {
        color: string;
        name: string;
      } | null;
      tag: {
        name: string;
        color: string;
      } | null;
      dueDate: Date | null;
      categoryId: string | null;
      tagId: string | null;
    }
  | undefined;

export default function TodoList({ todos: todo }: { todos: Todo }) {
  const utils = api.useContext();

  const deleteTodo = api.todo.deleteTodo.useMutation({
    onSuccess: async () => {
      await utils.todo.invalidate();
      toast({
        variant: "done",
        duration: 2000,
        title: "Başarılı!",
        description: "To-Do başarıyla silindi.",
      });
    },

    onError: (error) => {
      toast({
        variant: "destructive",
        duration: 2000,
        title: "To-Do silinirken bir hata oluştu!",
        description: error.message,
      });
    },
  });

  const tickTodo = api.todo.tickTodo.useMutation({
    onSuccess: async () => {
      await utils.todo.invalidate();
      toast({
        variant: "done",
        duration: 700,
        title: "Başarılı!",
        description: "To-Do başarıyla güncellendi.",
      });
    },

    onError: (error) => {
      toast({
        variant: "destructive",
        duration: 700,
        title: "To-Do güncellenirken bir hata oluştu!",
        description: error.message,
      });
    },
  });

  const transformedBackground = useRgba(todo?.category?.color, 0.1);

  return (
    <>
      <Card
        key={todo?.id}
        className={`mt-2 ${todo?.isDone ? "opacity-50" : ""}`}
      >
        <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
          <div className="space-y-1">
            <CardTitle>
              <Checkbox
                className="h-5 w-5 rounded-full"
                checked={todo?.isDone}
                onCheckedChange={() => {
                  if (todo?.id) {
                    tickTodo.mutate({ id: todo.id, status: !todo.isDone });
                  }
                }}
              />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <span
                    className={`ml-2 cursor-pointer hover:opacity-60 ${
                      todo?.isDone ? "line-through" : ""
                    }`}
                  >
                    {todo?.title}
                  </span>
                </AlertDialogTrigger>
                <AlertDialogContent className="h-[550px] overflow-y-scroll sm:max-w-[475px] md:max-w-[725px] lg:max-w-[850px]">
                  <PreviewTodo todo={todo} />
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-red-500 text-white hover:bg-red-400 hover:text-white">
                      KAPAT
                    </AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardTitle>
            <CardDescription>
              {todo?.content
                ? todo.content.length > 100
                  ? todo.content.slice(0, 100) + "..."
                  : todo.content
                : "İçerik yok."}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="secondary" className="mr-2 px-0 shadow-none">
                  <FileEdit className="mx-2 h-4 w-4" />
                  Düzenle
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="h-[550px] overflow-y-scroll sm:max-w-[425px] md:max-w-[650px] lg:max-w-[750px]">
                <AlertDialogHeader>
                  <AlertDialogTitle>To-Do Düzenle</AlertDialogTitle>
                  <AlertDialogDescription>
                    Aşağıdaki formu kullanarak To-Do&apos;yu
                    düzenleyebilirsiniz.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <UpdateTodoForm key={todo?.id} todo={todo} />
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-red-500 text-white hover:bg-red-400 hover:text-white">
                    KAPAT
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Separator orientation="vertical" className="h-[20px]" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="px-1 shadow-none">
                  <ChevronDownIcon className="h-4 w-4 text-secondary-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                alignOffset={-5}
                className="w-[200px]"
                forceMount
              >
                <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 hover:bg-red-100 hover:text-white"
                  onClick={() => {
                    if (todo?.id) {
                      deleteTodo.mutate({ id: todo.id });
                    }
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Sil
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            {todo?.category && (
              <div
                className="flex items-center rounded-md"
                style={{
                  backgroundColor: `${transformedBackground}`,
                }}
              >
                <FolderOpen
                  className="h-7 w-7 text-primary-foreground"
                  style={{ fill: todo?.category?.color }}
                />
                <span className="mx-2">{todo?.category?.name}</span>
              </div>
            )}
            {todo?.tag && (
              <Badge style={{ backgroundColor: todo?.tag?.color }}>
                <Tag className="mr-1 inline h-4 w-4" /> {todo?.tag?.name}
              </Badge>
            )}
            {todo?.dueDate && (
              <div className="flex items-center">
                <CalendarClock className="ml-1 mr-2 h-6 w-6" />
                <span className="text-md font-medium">
                  {format(new Date(todo?.dueDate), "dd MMMM yyyy", {
                    locale: tr,
                  })}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
