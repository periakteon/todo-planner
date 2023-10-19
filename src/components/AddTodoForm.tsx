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
import { AddTodoFormSchema } from "@/utils/schemas";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/utils";
import format from "date-fns/format";
import { CalendarIcon, Save } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { tr } from "date-fns/locale";
import { api } from "@/utils/api";

export default function AddTodoForm() {
  const addTodo = api.todo.addTodo.useMutation({
    onSuccess: () => {
      toast({
        variant: "done",
        title: "Başarılı!",
        description: "To-Do başarıyla eklendi.",
      });
    },

    onError: (error) => {
      toast({
        variant: "destructive",
        title: "To-Do eklenirken bir hata oluştu!",
        description: error.message,
      });
    },
  });

  const form = useForm<z.infer<typeof AddTodoFormSchema>>({
    resolver: zodResolver(AddTodoFormSchema),
  });

  function onSubmit(data: z.infer<typeof AddTodoFormSchema>) {
    void addTodo.mutate(data);
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>İçerik (Opsiyonel)</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
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
              <FormLabel>Kategori (Opsiyonel)</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
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
              <FormLabel>Etiket (Opsiyonel)</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
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
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={addTodo.isLoading || addTodo.isSuccess}
          type="submit"
          variant="purple"
        >
          {addTodo.isLoading && (
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
          {addTodo.isSuccess === true && (
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
          {addTodo.isError === false ||
            (addTodo.isError && (
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
          {!addTodo.isLoading && !addTodo.isSuccess && !addTodo.isError && (
            <span className="ml-1 flex">
              <Save className="mr-2" />
              To-Do Ekle
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
}
