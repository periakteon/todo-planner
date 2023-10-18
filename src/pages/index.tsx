import { type MyPage } from "@/components/layouts/types";
import { Button } from "@/components/ui/button";

const Home: MyPage = () => {
  return (
    <div className="p-4 sm:ml-64">
      <div className="mt-16 rounded-lg border-2 border-dashed border-gray-200 p-4">
        <div className="flex w-full flex-col items-center justify-center">
          <Button>Buton</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
Home.Layout = "LandingPage";
