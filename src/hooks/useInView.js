import { useEffect, useRef, useState } from "react";

// Tracks whether an element is near the viewport. Used to pause the WebGL
// canvases that are off-screen so only one scene animates at a time.
export function useInView(rootMargin = "100px") {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, inView];
}
