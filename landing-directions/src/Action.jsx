import { ArrowUpRight } from "@phosphor-icons/react";

// One CTA anatomy across the page; navigation and selection controls stay distinct.
export function Action({
  children,
  href,
  secondary = false,
  compact = false,
  tone,
  className = "",
  type = "button",
  ...props
}) {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      {...props}
      {...(href ? { href } : { type })}
      className={`action ${secondary ? "action-secondary" : ""} ${compact ? "action-compact" : ""} ${tone ? `action-${tone}` : ""} ${className}`}
    >
      <span className="action-label">{children}</span>
      <span className="action-arrow" aria-hidden="true">
        <ArrowUpRight size={20} />
      </span>
    </Tag>
  );
}
