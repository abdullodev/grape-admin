import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const ToggleTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme = stored || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    const disableTransitionsStyle = document.createElement("style");
    disableTransitionsStyle.textContent = `
      * {
        transition: none !important;
        animation: none !important;
      }
    `;
    document.head.appendChild(disableTransitionsStyle);

    document.body.offsetHeight;

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");

    document.documentElement.setAttribute("data-theme", newTheme);

    setTimeout(() => {
      document.head.removeChild(disableTransitionsStyle);
    }, 50);
  };

  return (
    <Button
      onClick={toggleTheme}
      className="p-2 rounded-full border border-gray-300 dark:border-gray-600 bg"
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </Button>
  );
};
