"use client";

import { usePathname } from "next/navigation";
import ThreeBackground from "./ThreeBackground";

export default function HomeBackground() {
    const pathname = usePathname();

    if (pathname !== "/") return null;

    return <ThreeBackground style={{ height: "100vh" }} />;
}
