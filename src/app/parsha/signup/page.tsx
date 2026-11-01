import type { Metadata } from "next";
import { SignUp } from "@/parsha/components/SignUp";

export const metadata: Metadata = { title: "מאכט אן אקאונט · Sign up" };

export default function Page() {
  return <SignUp />;
}
