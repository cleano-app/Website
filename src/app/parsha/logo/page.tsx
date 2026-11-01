import type { Metadata } from "next";
import { LogoMaker } from "@/parsha/components/LogoMaker";

export const metadata: Metadata = { title: "מאכט א לאגא · Make a logo" };

export default function Page() {
  return <LogoMaker />;
}
