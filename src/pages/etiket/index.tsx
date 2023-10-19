import { type MyPage } from "@/components/layouts/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TagPage: MyPage = () => {
  return (
    <>
      <div className="p-4 sm:ml-64">
        <Card className="mt-16 rounded-lg p-0">
          <CardHeader>
            <CardTitle>Etiket Listesi</CardTitle>
            <CardDescription>
              Aşağıdan eklemiş olduğunuz etiketlerinizi görebilirsiniz.
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

export default TagPage;
TagPage.Layout = "TodoPage";
