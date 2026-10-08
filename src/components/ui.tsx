import { ArrowDownToLine, ArrowUpRight, Check, Circle } from "lucide-react";
import { portfolio } from "../data/portfolio";
import type { ReactNode } from "react";
export function Tags({ items }: { items: string[] }) {
  return (
    <div className="tags">
      {items.map((t) => (
        <span key={t}>{t}</span>
      ))}
    </div>
  );
}
export function SectionHeader({
  number,
  title,
  subtitle,
  children,
}: {
  number: string;
  title: string;
  subtitle: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <div className="eyebrow">
          <span>{number}</span> / {subtitle}
        </div>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}
export function ResumeLink({ label = "View Resume" }: { label?: string }) {
  return portfolio.profile.resume ? (
    <a className="button secondary" href={portfolio.profile.resume} download>
      <ArrowDownToLine size={16} />
      {label}
    </a>
  ) : (
    <span className="resume-wrap">
      <button
        className="button secondary"
        disabled
        title="Resume file has not been supplied"
      >
        <ArrowDownToLine size={16} />
        {label}
      </button>
      <small>Resume coming soon</small>
    </span>
  );
}
export function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
      <ArrowUpRight size={15} />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
export function Status({
  children = "Active",
  complete = false,
}: {
  children?: ReactNode;
  complete?: boolean;
}) {
  return (
    <span className="status">
      {complete ? <Check size={12} /> : <Circle size={7} fill="currentColor" />}
      {children}
    </span>
  );
}
