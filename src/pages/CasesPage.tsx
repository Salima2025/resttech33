import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Store, Utensils, Building2, ChefHat } from "lucide-react";
import Seo from "@/components/Seo";

const solutions = [
  {
    category: "Франшиза",
    icon: Building2,
    title: "Франшиза «Burger Lab» — 12 точек",
    desc: "Унифицированный комплект оборудования для бургерной сети: тепловое, холодильное, нейтральное оборудование. Стандартизация расстановки, расчёт мощностей, логистика и монтаж по всем точкам.",
    items: ["Тепловое оборудование", "Холодильное оборудование", "Нейтральное оборудование", "Проект расстановки", "Расчёт мощностей"],
    result: "12 точек запущены за 6 месяцев",
    cta: "Запросить решение для франшизы",
  },
  {
    category: "Корнер",
    icon: Store,
    title: "Фуд-корнер «Street Wok»",
    desc: "Компактное готовое решение для фуд-корнера в торговом центре: тепловое оборудование, вытяжка, проект мощностей, монтаж за 5 дней.",
    items: ["Компактное тепловое оборудование", "Вытяжная система", "Проект мощностей", "Монтаж и подключение"],
    result: "Окупаемость за 4 месяца",
    cta: "Запросить решение для корнера",
  },
  {
    category: "Пекарня",
    icon: ChefHat,
    title: "Пекарня «Лепим‑Варим»",
    desc: "Полное оснащение пекарни с нуля: конвекционные печи, расстоечные шкафы, холодильное оборудование, тестомесы. Проект расстановки и расчёт мощностей.",
    items: ["Конвекционные печи", "Расстоечные шкафы", "Холодильное оборудование", "Тестомесы", "Проект кухни"],
    result: "Запуск с нуля за 21 день",
    cta: "Запросить решение для пекарни",
  },
  {
    category: "Ресторан",
    icon: Utensils,
    title: "Ресторан «Gourmet House», 150 мест",
    desc: "Комплексное оснащение ресторана: тепловое, холодильное, посудомоечное оборудование, барная зона. Проектирование кухни, расчёт мощностей, IoT-мониторинг.",
    items: ["Тепловое оборудование", "Холодильное оборудование", "Посудомоечное оборудование", "Барное оборудование", "IoT-мониторинг"],
    result: "Снижение расходов на 20%",
    cta: "Запросить решение для ресторана",
  },
  {
    category: "Франшиза",
    icon: Building2,
    title: "Кофейня «Coffee Point» — сеть 8 точек",
    desc: "Стандартизированное решение для кофейной сети: кофемашины, холодильные витрины, барное оборудование, единый проект для всех точек.",
    items: ["Кофемашины", "Холодильные витрины", "Барное оборудование", "Проект расстановки"],
    result: "8 точек за 4 месяца",
    cta: "Запросить решение для сети",
  },
  {
    category: "Корнер",
    icon: Store,
    title: "Пиццерия-корнер «Pizza Slice»",
    desc: "Готовое решение для пиццерии в формате корнера: печь для пиццы, холодильный стол, тепловая витрина, проект мощностей.",
    items: ["Печь для пиццы", "Холодильный стол", "Тепловая витрина", "Проект мощностей"],
    result: "Запуск за 10 дней",
    cta: "Запросить решение для корнера",
  },
];

export default function CasesPage() {
  return (
    <>
      <Seo
        title="Готовые решения для HoReCa — кейсы Rest-Tech"
        description="Кейсы оснащения франшиз, корнеров, пекарен и ресторанов: комплекты оборудования, проекты расстановки, сроки запуска и результат."
        path="/cases"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Готовые решения Rest-Tech",
          description: "Кейсы оснащения заведений HoReCa: франшизы, корнеры, пекарни, рестораны.",
          url: "https://resttech33.lovable.app/cases",
        }}
      />
      <section className="gradient-hero text-primary-foreground py-14 md:py-20">
        <div className="container-tight px-4 md:px-8">
          <h1 className="font-display font-bold text-3xl md:text-5xl mb-4">Готовые решения Rest‑Tech</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl">
            Франшизы, корнеры, пекарни — готовые комплекты оборудования с проектом расстановки и расчётом мощностей.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-tight">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-6">Реализованные проекты по форматам</h2>
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {["Все", "Франшиза", "Корнер", "Пекарня", "Ресторан"].map((tab) => (
              <span key={tab} className="px-4 py-2 rounded-full text-sm font-medium bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent cursor-pointer transition-colors">
                {tab}
              </span>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {solutions.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-2xl shadow-card border border-border overflow-hidden flex flex-col"
              >
                <div className="p-6 md:p-8 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <s.icon className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">{s.category}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-3">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{s.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {s.items.map((item) => (
                      <span key={item} className="text-xs bg-muted px-3 py-1 rounded-full text-muted-foreground">{item}</span>
                    ))}
                  </div>

                  <div className="bg-accent/10 rounded-lg px-4 py-2 mb-4">
                    <p className="text-sm font-semibold text-accent">{s.result}</p>
                  </div>

                  <Link to="/contacts">
                    <Button variant="accent" size="sm">
                      {s.cta} <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center pt-10">
            <p className="text-muted-foreground mb-4">Нужно индивидуальное решение под ваш формат?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/calculator">
                <Button variant="accent" size="lg">
                  Калькулятор инвестиций <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/contacts">
                <Button variant="outline" size="lg">Получить готовый проект</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
