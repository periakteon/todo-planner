import { useRouter } from "next/router";

export default function TodoPageSidebar() {
  const router = useRouter();
  const { pathname: path } = router;

  return (
    <>
      <div className="">
        <span>Sidebar: {path}</span>
      </div>
    </>
  );
}
