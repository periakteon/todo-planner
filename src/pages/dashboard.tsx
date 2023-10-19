import { type MyPage } from "@/components/layouts/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TodoHome: MyPage = () => {
  return (
    <>
      <div className="p-4 sm:ml-64">
        <Card className="mt-16 rounded-lg p-0">
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>
              Aşağıda uygulamaya ait genel istatistiklerinizi görebilirsiniz.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <span>To-Do Test</span>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default TodoHome;
TodoHome.Layout = "TodoPage";
