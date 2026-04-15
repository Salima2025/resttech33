import { Link } from "react-router-dom";

const footerLinks = {
  "Решения": [
    { label: "Оборудование", href: "/solutions/equipment" },
    { label: "Спроектировать кухню", href: "/solutions/design" },
    { label: "Ресторанные технологии", href: "/solutions/iot" },
    { label: "Консалтинг & обучение", href: "/solutions/consulting" },
  ],
  "Компания": [
    { label: "О нас", href: "/about" },
    { label: "Готовые решения", href: "/cases" },
    { label: "Контакты", href: "/contacts" },
  ],
  "Сценарии": [
    { label: "Кафе 100–150 мест", href: "/calculator" },
    { label: "Сеть ресторанов", href: "/calculator" },
    { label: "Кухня-сервис", href: "/calculator" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-tight section-padding">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-display font-bold text-sm">RT</span>
              </div>
              <span className="font-display font-bold text-lg">Rest-Tech</span>
            </div>
            <p className="text-sm text-primary-foreground/70 max-w-[240px]">
              Интегратор умной кухни для HoReCa. Оборудование, ресторанные технологии, консалтинг.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-sm mb-4 text-primary-foreground/90">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/50">© 2026 Rest-Tech. Все права защищены.</p>
          <Link to="/calculator" className="text-sm font-semibold text-accent hover:text-orange-light transition-colors">
            Калькулятор инвестиций →
          </Link>
        </div>
      </div>
    </footer>
  );
}
