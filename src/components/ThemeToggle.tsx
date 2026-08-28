import * as React from "react"
import { Moon, Sun } from "lucide-react"

type Theme = "light" | "dark"

const ThemeCtx = React.createContext<{ theme: Theme; toggle: () => void }>({
  theme: "light",
  toggle: () => {},
})

export function useTheme() {
  return React.useContext(ThemeCtx)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>(() => {
    if (typeof document === "undefined") return "light"
    return document.documentElement.classList.contains("dark") ? "dark" : "light"
  })

  const apply = React.useCallback((t: Theme) => {
    setTheme(t)
    document.documentElement.classList.toggle("dark", t === "dark")
    try { localStorage.setItem("lucit-theme", t) } catch {}
  }, [])

  const toggle = React.useCallback(() => {
    apply(theme === "dark" ? "light" : "dark")
  }, [theme, apply])

  React.useEffect(() => {
    const m = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => {
      try {
        if (!localStorage.getItem("lucit-theme")) apply(m.matches ? "dark" : "light")
      } catch {}
    }
    m.addEventListener?.("change", onChange)
    return () => m.removeEventListener?.("change", onChange)
  }, [apply])

  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    if ((isDark ? "dark" : "light") !== theme) setTheme(isDark ? "dark" : "light")
  }, []) // eslint-disable-line

  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>
}

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={theme === "dark"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white/70 text-zinc-600 backdrop-blur-md transition-colors hover:bg-white hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 dark:focus-visible:ring-white"
    >
      <Sun className="h-[15px] w-[15px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" aria-hidden />
      <Moon className="absolute h-[15px] w-[15px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" aria-hidden />
    </button>
  )
}
