import { scrollToId } from "../motion/smoothScroll";

// In-page anchor that glides through Lenis instead of jumping.
export default function ScrollLink({ to, onClick, children, ...props }) {
  return (
    <a
      href={`#${to}`}
      onClick={(e) => {
        e.preventDefault();
        scrollToId(to);
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
