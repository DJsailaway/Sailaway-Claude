import { useEffect, useRef, useState } from "react";

export default function FadeInSection({
  children,
  delay = 0,
}) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      {
        threshold: 0.12,
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0px)"
          : "translateY(30px)",
        transition: `
          opacity 0.9s ease,
          transform 0.9s ease
        `,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
