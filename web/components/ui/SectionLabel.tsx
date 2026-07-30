type SectionLabelProps = {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
  as?: "span" | "p" | "div";
};

/**
 * The small wide-tracked label that opens every section — What We Deliver,
 * Selected Work, Start a Project. Spec section 16.
 */
export function SectionLabel({
  children,
  tone = "dark",
  className,
  as: Tag = "span",
}: SectionLabelProps) {
  return (
    <Tag
      className={[
        "section-label",
        tone === "light" ? "section-label--on-dark" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
