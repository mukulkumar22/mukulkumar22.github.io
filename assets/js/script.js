(() => {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const yearEl = document.getElementById("year");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") {
    root.setAttribute("data-theme", stored);
  }

  const currentTheme = () => {
    const explicit = root.getAttribute("data-theme");
    if (explicit) return explicit;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  toggle?.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  // Keep site navigation in the same tab, but open external web links separately.
  document.querySelectorAll('a[href^="http://"], a[href^="https://"]').forEach((a) => {
    const url = new URL(a.href);
    if (url.origin === location.origin) return;

    a.target = "_blank";

    const rel = new Set((a.rel || "").split(/\s+/).filter(Boolean));
    rel.add("noopener");
    rel.add("noreferrer");
    a.rel = [...rel].join(" ");
  });

  // Active section highlight in sidebar nav (home page only)
  const navLinks = document.querySelectorAll(".sidebar-nav a");

  // Extract the #hash from hrefs like "/#about" or "#about"
  const hashFromHref = (href) => {
    try {
      const url = new URL(href, location.origin);
      return url.hash || null;
    } catch {
      return null;
    }
  };

  const sectionMap = [];
  navLinks.forEach((a) => {
    const hash = hashFromHref(a.getAttribute("href"));
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) sectionMap.push({ link: a, section: el, hash });
  });

  if ("IntersectionObserver" in window && sectionMap.length) {
    const setActive = (hash) => {
      sectionMap.forEach(({ link, hash: h }) => {
        link.classList.toggle("active", h === hash);
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const match = sectionMap.find((s) => s.section === visible.target);
          if (match) setActive(match.hash);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sectionMap.forEach(({ section }) => io.observe(section));
  }
})();
