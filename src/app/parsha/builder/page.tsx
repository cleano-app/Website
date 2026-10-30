import type { Metadata } from "next";
import { Builder } from "@/parsha/components/Builder";

export const metadata: Metadata = { title: "מאכט א שיט · Make a sheet" };

export default function BuilderPage() {
  return <Builder />;
}
