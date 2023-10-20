import { type MyPage } from "@/components/layouts/types";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import AddTagForm from "@/components/AddTagForm";
import { api } from "@/utils/api";
import { toast } from "@/components/ui/use-toast";
import UpdateTagForm from "@/components/UpdateTagForm";

const TagPage: MyPage = () => {
  const utils = api.useContext();

  const tags = api.tag.getTags.useQuery();

  const { data: tagData } = tags;

  const deleteTag = api.tag.deleteTag.useMutation({
    onSuccess: async () => {
      await utils.tag.invalidate();
      toast({
        variant: "done",
        duration: 1000,
        title: "Başarılı!",
        description: "Etiket başarıyla silindi.",
      });
    },

    onError: (error) => {
      toast({
        variant: "destructive",
        duration: 1000,
        title: "Etiket silinirken bir hata oluştu!",
        description: error.message,
      });
    },
  });

  return (
    <>
      <div className="p-4 sm:ml-64">
        <Card className="mt-16 rounded-lg p-0">
          <CardHeader>
            <CardTitle>Etiketler</CardTitle>
            <CardDescription>
              Aşağıdan etiket ekleyebilir ve eklemiş olduğunuz etiketleri
              görebilirsiniz.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <>
              <Sheet>
                <SheetTrigger>
                  <Button
                    type="button"
                    className="inline-flex items-center rounded-lg bg-green-600 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-200 dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800"
                  >
                    <PlusCircle className="mr-2" />
                    Yeni Etiket Ekle
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Yeni Etiket</SheetTitle>
                    <SheetDescription>
                      Aşağıdaki formu doldurarak yeni etiket ekleyebilirsiniz.
                      <AddTagForm />
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
              {tags.isLoading && (
                <Card className="w-3/3 mt-4 rounded-lg p-0 sm:w-2/3 md:w-2/3">
                  <CardContent>
                    <div className="flex items-center justify-center">
                      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              )}
              {tagData?.length === 0 ? (
                <div className="mt-4">
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Henüz hiç kategori eklenmemiş.
                  </p>
                </div>
              ) : (
                <Card className="w-3/3 mt-4 rounded-lg p-0 sm:w-2/3 md:w-2/3">
                  <CardContent>
                    {tagData?.map((tag) => (
                      <ul
                        key={tag.id}
                        className="mt-4 divide-y divide-gray-200 border-b-2 dark:divide-gray-700"
                      >
                        <li className="pb-3 sm:pb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <div
                                style={{ backgroundColor: tag.color }}
                                className="h-7 w-7 rounded-full"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xl font-medium text-gray-900 dark:text-white">
                                {tag.name}
                              </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="purple">DÜZENLE</Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                  <div className="grid gap-4">
                                    <div className="space-y-2">
                                      <h4 className="font-medium leading-none">
                                        {tag.name}
                                      </h4>
                                    </div>
                                    <UpdateTagForm tag={tag} />
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive">SİL</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Emin misiniz?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Bu işlem geri alınamaz. Bu kategoriyi
                                      sildikten sonra geri getiremezsiniz.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Vazgeç
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      className="dark:hover-bg-red-400 bg-red-500 text-white hover:bg-red-400 dark:bg-red-500"
                                      onClick={() =>
                                        deleteTag.mutate({
                                          id: tag.id,
                                        })
                                      }
                                    >
                                      SİL
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </li>
                      </ul>
                    ))}
                  </CardContent>
                </Card>
              )}
            </>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default TagPage;
TagPage.Layout = "TodoPage";
