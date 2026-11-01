import type { Metadata } from "next";
import { ClassEditor } from "@/parsha/components/ClassEditor";

export const metadata: Metadata = { title: "מיין קלאס · My class" };

export default function Page() {
  return <ClassEditor />;
}
