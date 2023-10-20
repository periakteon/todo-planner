import { CalendarClock, FolderOpen, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import useRgba from "@/hooks/useRgba";
import { Badge } from "./ui/badge";
import format from "date-fns/format";
import { tr } from "date-fns/locale";
import dynamic from "next/dynamic";

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

const EditorMarkdown = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false },
);

export default function PreviewTodo({ todo }: { todo: Todo }) {
  const transformedBackground = useRgba(todo?.category?.color, 0.1);

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-4xl">
          {todo?.title}{" "}
          <div>
            {todo?.isDone === true ? (
              <Badge className="bg-green-500 text-white hover:bg-green-400 hover:text-white dark:hover:bg-green-600 dark:hover:text-white">
                <span className="text-sm font-medium">Tamamlandı</span>
              </Badge>
            ) : (
              <Badge className="bg-red-500 text-white hover:bg-red-400 hover:text-white dark:hover:bg-red-600 dark:hover:text-white">
                <span className="text-sm font-medium">Tamamlanmadı</span>
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 gap-6">
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
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase"></div>
        </div>
        <EditorMarkdown source={todo?.content ?? ""} />
      </CardContent>
    </Card>
  );
}
