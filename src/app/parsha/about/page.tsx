import type { Metadata } from "next";
import { BRAND, CONTACT_EMAIL } from "@/parsha/config";
import { T } from "@/parsha/i18n";

export const metadata: Metadata = { title: "וועגן אונז · About" };

const STANDARDS = [
  {
    yi: "יעדע פרשה ווערט דורכגעקוקט דורך א מלמד אדער מורה פאר מען שטעלט עס ארויף.",
    en: "Every parsha is checked by a melamed or morah before it goes up.",
  },
  {
    yi: "קיין פנימער פון די אבות, אמהות אדער צדיקים. מיר ווייזן זאכן און ערטער: א געצעלט, א ברונעם, א לייטער.",
    en: "No faces of the Avos, Imahos or tzaddikim. We show objects and places instead: a tent, a well, a ladder.",
  },
  { yi: "נאר תורה'דיגע זאכן, אן קיין וועלטליכע טעמעס.", en: "Torah content only, no secular themes." },
];

export default function About() {
  return (
    <div className="mx-auto max-w-prose space-y-6 px-4 py-8 text-lg leading-relaxed">
      <h1 className="text-3xl font-bold">
        <T yi={`וועגן ${BRAND.yi}`} en={`About ${BRAND.en}`} />
      </h1>
      <section>
        <h2 className="text-xl font-semibold">
          <T yi="פאר וועמען?" en="Who it's for" />
        </h2>
        <p>
          <T
            yi="פאר מורות, פלעיגרופס, מלמדים, פליי סקימס און עלטערן. יעדע וואך א פרישע שיט אויף די פרשה, אין היימישן אידיש, מיט אייער אייגענע לאגא און נאמען."
            en="For morahs, playgroups, melamdim, play schemes and parents. A fresh sheet on the parsha every week, in heimish Yiddish, with your own logo and name."
          />
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">
          <T yi="היימישע סטאנדארטן" en="Heimish standards" />
        </h2>
        <ul className="list-disc space-y-1 ps-6">
          {STANDARDS.map((s) => (
            <li key={s.en}>
              <T {...s} />
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">
          <T yi="קאנטאקט" en="Contact" />
        </h2>
        <p dir="ltr" className="text-start">
          {CONTACT_EMAIL}
        </p>
      </section>
    </div>
  );
}
