import { type MyPage } from "@/components/layouts/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
            <span>Kategori Test</span>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CategoryPage;
CategoryPage.Layout = "TodoPage";
