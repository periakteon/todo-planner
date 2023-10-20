import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { UpdateTodoSchema } from "@/utils/schemas";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/utils";
import format from "date-fns/format";
import { CalendarIcon, Check, ChevronsUpDown, Save } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { tr } from "date-fns/locale";
import { api } from "@/utils/api";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useTheme } from "next-themes";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { useRouter } from "next/router";

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

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function UpdateTodoForm({ todo }: { todo: Todo }) {
  const [markdown, setMarkdown] = useState(todo?.content ?? "");

  const router = useRouter();

  const { resolvedTheme } = useTheme();

  const utils = api.useContext();

  const updateTodo = api.todo.updateTodo.useMutation({
    onSuccess: async () => {
      await utils.todo.invalidate();
      toast({
        variant: "done",
        duration: 2000,
        title: "Başarılı!",
        description: "To-Do başarıyla güncellendi.",
      });
    },

    onError: (error) => {
      toast({
        variant: "destructive",
        duration: 2000,
        title: "To-Do güncellenirken bir hata oluştu!",
        description: error.message,
      });
    },
  });

  const getCategoriesAndTags = api.todo.getCategoriesAndTags.useQuery();

  const { data: categoriesAndTags } = getCategoriesAndTags;

  const form = useForm<z.infer<typeof UpdateTodoSchema>>({
    resolver: zodResolver(UpdateTodoSchema),
    defaultValues: {
      id: todo?.id,
      title: todo?.title,
      content: todo?.content ?? "",
      category: todo?.categoryId ?? undefined,
      tag: todo?.tagId ?? undefined,
      dueDate: todo?.dueDate ?? undefined,
    },
  });

  function onSubmit(data: z.infer<typeof UpdateTodoSchema>) {
    void updateTodo.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/3 space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Başlık</FormLabel>
              <FormControl>
                <Input placeholder="Örn. Alışveriş" {...field} />
              </FormControl>
              <FormDescription>Görevinizi kısaca özetleyin.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={() => (
            <FormItem>
              <FormLabel>İçerik (Opsiyonel)</FormLabel>
              <FormControl>
                <>
                  <div data-color-mode={resolvedTheme}>
                    {/* TODO: MARKDOWN BOYUTUNU BÜYÜLT*/}
                    <MDEditor
                      height={425}
                      value={markdown}
                      onChange={(value) => {
                        setMarkdown(value ?? "");
                        form.setValue("content", value);
                      }}
                    />
                  </div>
                </>
              </FormControl>
              <FormDescription>
                Markdown kullanarak To-Do&apos;nuzu detaylandırabilirsiniz.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block">Kategori (Opsiyonel)</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[300px] justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value && (
                          <div className="flex items-center">
                            <span
                              style={{
                                backgroundColor:
                                  categoriesAndTags?.categories?.find(
                                    (category) => category.id === field.value,
                                  )?.color,
                              }}
                              className="mr-2 h-5 w-5 rounded"
                            ></span>
                            {
                              categoriesAndTags?.categories?.find(
                                (category) => category.id === field.value,
                              )?.name
                            }
                          </div>
                        )}
                        {!field.value && "Kategori seçiniz"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="z-50 w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder="Kategori ara..." />
                      <CommandEmpty>Kategori bulunamadı.</CommandEmpty>
                      <CommandGroup className="max-h-64 overflow-y-auto">
                        {categoriesAndTags?.categories.map((category) => (
                          <CommandItem
                            value={category.name}
                            key={category.id}
                            onSelect={() => {
                              form.clearErrors("category");
                              form.setValue("category", category.id);

                              if (category.id === field.value) {
                                form.setValue("category", undefined);
                              }
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                category.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            <div className="flex items-center">
                              <span
                                style={{ backgroundColor: category.color }}
                                className="mr-2 h-5 w-5 rounded"
                              ></span>
                              {category.name}
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      <Button
                        variant={"outline"}
                        className="mt-3 w-full"
                        onClick={() => void router.push("/kategori")}
                      >
                        Kategori Ekle
                      </Button>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormDescription>
                Kategori seçerek To-Do&apos;nuzu kategorize edebilirsiniz.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block">Etiket (Opsiyonel)</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[300px] justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value && (
                          <div className="flex items-center">
                            <span
                              style={{
                                backgroundColor: categoriesAndTags?.tags?.find(
                                  (tag) => tag.id === field.value,
                                )?.color,
                              }}
                              className="mr-2 h-5 w-5 rounded"
                            ></span>
                            {
                              categoriesAndTags?.tags?.find(
                                (tag) => tag.id === field.value,
                              )?.name
                            }
                          </div>
                        )}
                        {!field.value && "Etiket seçiniz"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="z-50 w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder="Etiket ara..." />
                      <CommandEmpty>Etiket bulunamadı.</CommandEmpty>
                      <CommandGroup className="max-h-64 overflow-y-auto">
                        {categoriesAndTags?.tags.map((tag) => (
                          <CommandItem
                            value={tag.name}
                            key={tag.id}
                            onSelect={() => {
                              form.clearErrors("tag");
                              form.setValue("tag", tag.id);

                              if (tag.id === field.value) {
                                form.setValue("tag", undefined);
                              }
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                tag.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            <div className="flex items-center">
                              <span
                                style={{ backgroundColor: tag.color }}
                                className="mr-2 h-5 w-5 rounded"
                              ></span>
                              {tag.name}
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      <Button
                        variant={"outline"}
                        className="mt-3 w-full"
                        onClick={() => void router.push("/etiket")}
                      >
                        Etiket Ekle
                      </Button>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormDescription>
                Etiket seçerek To-Do&apos;nuzu etiketleyebilirsiniz.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Tarih (Opsiyonel)</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: tr })
                      ) : (
                        <span>Bir tarih seçiniz</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    locale={tr}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                To-Do&apos;nuzun son tarihini seçebilirsiniz.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={updateTodo.isLoading || updateTodo.isSuccess}
          type="submit"
          variant="purple"
        >
          {updateTodo.isLoading && (
            <div className="flex items-center justify-center text-center">
              <svg
                className="h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4.73 4.73a8 8 0 1 0 11.31 11.31l1.41-1.41a6 6 0 1 1-8.48-8.48l1.41-1.41z"
                ></path>
              </svg>
            </div>
          )}
          {updateTodo.isSuccess === true && (
            <div className="flex items-center justify-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="white"
              >
                <path d="M9.293 16.293l-4-4a1 1 0 011.414-1.414L10 13.586l6.293-6.293a1 1 0 111.414 1.414l-7 7a1 1 0 01-1.414 0z" />
              </svg>
              <span className="ml-2">Başarıyla Eklendi</span>
            </div>
          )}
          {updateTodo.isError === false ||
            (updateTodo.isError && (
              <div className="flex items-center justify-center text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="#ed7979"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM11 7H13V13H11V7ZM11 15H13V17H11V15Z"
                  />
                </svg>
                <span className="ml-2">Başarısız</span>
              </div>
            ))}
          {!updateTodo.isLoading &&
            !updateTodo.isSuccess &&
            !updateTodo.isError && (
              <span className="ml-1 flex">
                <Save className="mr-2" size={20} />
                To-Do Güncelle
              </span>
            )}
        </Button>
      </form>
    </Form>
  );
}
