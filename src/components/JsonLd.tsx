// Renders a schema.org JSON-LD block.
//
// The `<` escape matters: a JSON string containing "</script>" would close
// this tag early and the rest would be parsed as HTML. Nothing here comes
// from user input today - it's all site content - but the escape costs
// nothing and stops that becoming a problem the day something dynamic is added.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
