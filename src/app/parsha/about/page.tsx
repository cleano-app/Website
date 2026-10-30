import type { Metadata } from "next";
import { BRAND, CONTACT_EMAIL } from "@/parsha/config";

export const metadata: Metadata = { title: "וועגן אונז" };

export default function About() {
  return (
    <div className="mx-auto max-w-prose space-y-6 px-4 py-8 text-lg leading-relaxed">
      <h1 className="font-p-heading text-3xl font-bold">וועגן {BRAND}</h1>
      <section>
        <h2 className="font-p-heading text-xl font-semibold">פאר וועמען</h2>
        <p>
          פאר מורות, פלעיגרופס, מלמדים, פליי סקימס און עלטערן. יעדע וואך א פרישע בלאט אויף די פרשה, אין היימישן
          אידיש, מיט אייער אייגענע לאגא און נאמען.
        </p>
      </section>
      <section>
        <h2 className="font-p-heading text-xl font-semibold">היימישע סטאנדארטן</h2>
        <ul className="list-disc space-y-1 ps-6">
          <li>יעדע פרשה ווערט דורכגעקוקט דורך א מלמד אדער מורה איידער זי ווערט ארויסגעגעבן.</li>
          <li>קיין פנימער פון די אבות, אמהות אדער צדיקים. מיר ווייזן זאכן און ערטער: א געצעלט, א ברונעם, א לייטער.</li>
          <li>נאר תורה&apos;דיגע זאכן, אן קיין וועלטליכע טעמעס.</li>
        </ul>
      </section>
      <section>
        <h2 className="font-p-heading text-xl font-semibold">קאנטאקט</h2>
        <p dir="ltr" className="text-start">
          {CONTACT_EMAIL}
        </p>
      </section>
    </div>
  );
}
