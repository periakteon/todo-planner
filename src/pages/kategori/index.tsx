import AddCategoryForm from "@/components/AddCategoryForm";
import { type MyPage } from "@/components/layouts/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

const CategoryPage: MyPage = () => {
  const [show, setShow] = useState<boolean>(false);
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
              <Button
                type="button"
                className={`mr-2 inline-flex items-center rounded-lg ${
                  !show
                    ? "bg-green-600 hover:bg-green-500 focus:ring-green-200 dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800"
                    : "bg-red-600 hover:bg-red-500 focus:ring-red-200 dark:bg-red-600 dark:hover:bg-red-500 dark:focus:ring-red-800"
                } px-3 py-1.5 text-center text-xs font-medium text-white focus:outline-none focus:ring-4`}
                onClick={() => setShow(!show)}
              >
                {!show ? (
                  <PlusCircle className="mr-2" />
                ) : (
                  <PlusCircle className="mr-2 rotate-45 transform" />
                )}
                Kategori Ekle
              </Button>
              {show && <AddCategoryForm />}
            </>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CategoryPage;
CategoryPage.Layout = "TodoPage";
