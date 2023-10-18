import { type MyPage } from "@/components/layouts/types";

const TodoHome: MyPage = () => {
  return (
    <div className="p-4">
      <div className="mt-16 rounded-lg border-2 border-dashed border-gray-200 p-4">
        <div>Page</div>
      </div>
    </div>
  );
};

export default TodoHome;
TodoHome.Layout = "TodoPage";
