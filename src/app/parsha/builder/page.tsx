import type { Metadata } from "next";
import { Builder } from "@/parsha/components/Builder";

export const metadata: Metadata = { title: "מאכט אייער בלאט" };

export default function BuilderPage() {
  return <Builder />;
}
