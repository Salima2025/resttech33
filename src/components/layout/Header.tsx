import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const solutions = [
  { label: "Оборудование", href: "/solutions/equipment", desc: "Новое и б/у для HoReCa" },
  { label: "IoT-экосистема", href: "/solutions/iot", desc: "Умная кухня «под ключ»" },
  { label: "Консалтинг & обучение", href: "/solutions/consulting", desc: "Аудит, обучение, внедрение" },
];

const navLinks = [
  { label: "Решения", href: "/solutions", children: solutions },
  { label: "Калькулятор ROI", href: "/calculator" },
  { label: "Кейсы", href: "/cases" },
  { label: "О компании", href: "/about" },
  { label: "Контакты", href: "/contacts" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container-tight flex items-center justify-between h-16 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-accent-foreground font-display font-bold text-sm">RT</span>
          </div>
          <span className="font-display font-bold text-lg text-foreground">Rest-Tech</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative group">
                <button
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-card border border-border rounded-xl shadow-elevated p-2 min-w-[260px]">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-muted transition-colors"
                      >
                        <span className="text-sm font-semibold text-foreground">{child.label}</span>
                        <span className="text-xs text-muted-foreground">{child.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  location.pathname === link.href
                    ? "text-foreground bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/calculator">
            <Button variant="navCta" size="sm">Оценить экономику</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-b border-border px-4 pb-4">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label}>
                <button
                  onClick={() => setSolutionsOpen(!solutionsOpen)}
                  className="flex items-center justify-between w-full py-3 text-sm font-medium text-foreground"
                >
                  {link.label}
                  <ChevronDown className={cn("w-4 h-4 transition-transform", solutionsOpen && "rotate-180")} />
                </button>
                {solutionsOpen && (
                  <div className="pl-4 pb-2 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-sm font-medium text-foreground"
              >
                {link.label}
              </Link>
            )
          )}
          <Link to="/calculator" onClick={() => setMobileOpen(false)}>
            <Button variant="accent" className="w-full mt-2">Оценить экономику</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
