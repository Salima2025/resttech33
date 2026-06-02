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
  "Документы": [
    { label: "Политика обработки ПДн", href: "/legal/privacy" },
    { label: "Согласие на обработку ПДн", href: "/legal/personal-data-consent" },
    { label: "Публичная оферта", href: "/legal/offer" },
    { label: "Пользовательское соглашение", href: "/legal/terms" },
    { label: "Согласие на рассылку", href: "/legal/marketing-consent" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-tight section-padding">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display font-bold text-lg leading-none">
                <span className="text-[hsl(217_100%_60%)]">REST</span>
                <span>-</span>
                <span className="text-accent">TECH</span>
              </span>
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
          <div className="text-xs text-primary-foreground/50 space-y-1">
            <p>© 2026 Rest-Tech. Все права защищены.</p>
            <p>ИП Ломакин Павел Константинович · ИНН 502728918918</p>
          </div>
          <Link to="/calculator" className="text-sm font-semibold text-accent hover:text-orange-light transition-colors">
            Калькулятор инвестиций →
          </Link>
        </div>
      </div>
    </footer>
  );
}
