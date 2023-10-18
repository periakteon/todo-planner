import { type MyPage } from "@/components/layouts/types";

const ErrorPage: MyPage = () => {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
};

export default ErrorPage;
ErrorPage.Layout = "NoLayout";
