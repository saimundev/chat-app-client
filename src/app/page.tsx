"use client";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();

  //handel logout
  const handleLogout = () => {
    deleteCookie("userToken");
    router.push("/sign-in")
  };
  return (
    <main>
      <h1>home page</h1>
      <button onClick={handleLogout}>LogOut</button>
    </main>
  );
}
