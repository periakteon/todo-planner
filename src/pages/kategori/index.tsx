import AddCategoryForm from "@/components/AddCategoryForm";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { api } from "@/utils/api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UpdateCategoryForm from "@/components/UpdateCategoryForm";

const CategoryPage: MyPage = () => {
  const categories = api.category.getCategories.useQuery();

  const { data: categoryData } = categories;

  return (
    <>
      <div className="p-4 sm:ml-64">
        <Card className="mt-16 rounded-lg p-0">
          <CardHeader>
            <CardTitle>Kategoriler</CardTitle>
            <CardDescription>
              Aşağıdan kategori ekleyebilir ve eklemiş olduğunuz kategorileri
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
                    Yeni Kategori Ekle
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Yeni Kategori</SheetTitle>
                    <SheetDescription>
                      Aşağıdaki formu doldurarak yeni kategori ekleyebilirsiniz.
                      <AddCategoryForm />
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
              <Card className="w-3/3 mt-4 rounded-lg p-0 sm:w-2/3 md:w-2/3">
                <CardContent>
                  {categoryData?.map((category) => (
                    <ul
                      key={category.id}
                      className="mt-4 divide-y divide-gray-200 border-b-2 dark:divide-gray-700"
                    >
                      <li className="pb-3 sm:pb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div
                              style={{ backgroundColor: category.color }}
                              className="h-7 w-7 rounded-full"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xl font-medium text-gray-900 dark:text-white">
                              {category.name}
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
                                      {category.name}
                                    </h4>
                                  </div>
                                  <UpdateCategoryForm category={category} />
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            SİL
                          </div>
                        </div>
                      </li>
                    </ul>
                  ))}
                </CardContent>
              </Card>
            </>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CategoryPage;
CategoryPage.Layout = "TodoPage";
