import { type MyPage } from "@/components/layouts/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TodoList: MyPage = () => {
  return (
    <>
      <div className="p-4 sm:ml-64">
        <Card className="mt-16 rounded-lg p-0">
          <CardHeader>
            <CardTitle>To-Do Listesi</CardTitle>
            <CardDescription>
              Aşağıda eklemiş olduğunuz To-Do&rsquo;ların listesini
              görebilirsiniz.
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

export default TodoList;
TodoList.Layout = "TodoPage";
