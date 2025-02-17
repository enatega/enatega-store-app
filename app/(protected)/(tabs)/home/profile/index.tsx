import { usePathname, useRouter } from "expo-router";
import { useEffect } from "react";

export default function Profile() {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/home/profile") {
      router.replace("/");
    }
    router.replace("/(tabs)/profile");
  }, [pathname]);
  return <></>;
}
