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

const CategoryPage: MyPage = () => {
  //TODO: Kategorilerin görüneceği badge'e color picker eklenecek ve seçilen renklerde badge'ler görünecek.
  //TODO: Renk kodu veritabanına kayıt edilecek.
  return (
    <>
      <div className="p-4 sm:ml-64">
        <Card className="mt-16 rounded-lg p-0">
          <CardHeader>
            <CardTitle>Kategori Ekle</CardTitle>
            <CardDescription>
              Aşağıdan kategori ekleyebilirsiniz.
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
                    Kategori Ekle
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
            </>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CategoryPage;
CategoryPage.Layout = "TodoPage";
