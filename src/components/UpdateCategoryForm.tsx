import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { UpdateCategorySchema } from "@/utils/schemas";
import { api } from "@/utils/api";
import { useState } from "react";
import { Label } from "./ui/label";
import { SliderPicker } from "react-color";
import { Save } from "lucide-react";

type Category = {
  id: string;
  userId: string;
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function UpdateCategoryForm({
  category,
}: {
  category: Category;
}) {
  const [, setColor] = useState<string>("#fff");
  const utils = api.useContext();

  const updateCategory = api.category.updateCategory.useMutation({
    onSuccess: async () => {
      await utils.category.invalidate();
      toast({
        variant: "done",
        duration: 2000,
        title: "Başarılı!",
        description: "Kategori başarıyla güncellendi.",
      });
    },

    onError: (error) => {
      toast({
        variant: "destructive",
        duration: 2000,
        title: "Kategori güncellenirken bir hata oluştu!",
        description: error.message,
      });
    },
  });

  const form = useForm<z.infer<typeof UpdateCategorySchema>>({
    resolver: zodResolver(UpdateCategorySchema),
    defaultValues: {
      id: category.id,
      name: category.name,
      color: category.color,
    },
  });

  function onSubmit(data: z.infer<typeof UpdateCategorySchema>) {
    void updateCategory.mutate(data);
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
                <FormControl>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="width">Ad</Label>
                      <Input placeholder="Örn. İş" {...field} />
                    </div>
                  </div>
                </FormControl>
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
                  <SliderPicker
                    color={field.value}
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
          <Button
            disabled={updateCategory.isLoading}
            type="submit"
            variant="purple"
          >
            {updateCategory.isLoading && (
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
            {updateCategory.isError === false ||
              (updateCategory.isError && (
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
            {!updateCategory.isLoading && !updateCategory.isError && (
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
