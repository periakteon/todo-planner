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
import { SketchPicker } from "react-color";
import { toast } from "@/components/ui/use-toast";
import { AddCategorySchema } from "@/utils/schemas";
import { Save } from "lucide-react";
import { api } from "@/utils/api";
import { useState } from "react";

export default function AddTagForm() {
  const [color, setColor] = useState<string>("#fff");

  const form = useForm<z.infer<typeof AddCategorySchema>>({
    resolver: zodResolver(AddCategorySchema),
  });

  const addTag = api.tag.addTag.useMutation({
    onSuccess: () => {
      form.setValue("name", "");
      toast({
        variant: "done",
        duration: 1000,
        title: "Başarılı!",
        description: "Etiket başarıyla eklendi.",
      });
    },

    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Etiket eklenirken bir hata oluştu!",
        description: error.message,
      });
    },
  });

  function onSubmit(data: z.infer<typeof AddCategorySchema>) {
    void addTag.mutate(data);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-3/3 mt-4 space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Etiket Adı</FormLabel>
                <FormControl>
                  <Input placeholder="Örn. TypeScript" {...field} />
                </FormControl>
                <FormDescription>Etiket adını yazınız.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Renk (Opsiyonel)</FormLabel>
                <FormControl>
                  <SketchPicker
                    disableAlpha={true}
                    color={color}
                    onChange={(color) => setColor(color.hex)}
                    onChangeComplete={(color) => {
                      field.onChange(color.hex);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={addTag.isLoading} type="submit" variant="purple">
            {addTag.isLoading && (
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
            {addTag.isError === false ||
              (addTag.isError && (
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
            {!addTag.isLoading && !addTag.isError && (
              <span className="ml-1 flex">
                <Save className="mr-2" size={20} />
                Kaydet
              </span>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
