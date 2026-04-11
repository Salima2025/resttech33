import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TrendingDown, Clock, Zap, ArrowRight } from "lucide-react";

const cases = [
  {
    category: "Кафе",
    title: "Кафе «Urban Brew», 80 мест",
    subtitle: "Сокращение простоев на кухне на 25 % за 6 месяцев",
    before: "Частые простои на кухне, перегрев оборудования и высокие операционные расходы.",
    after: "IoT‑контроль печей, тревоги, уведомления и обучение персонала.",
    results: [
      { icon: TrendingDown, value: "25%", label: "сокращение простоев" },
      { icon: Zap, value: "18%", label: "снижение операционных расходов" },
      { icon: Clock, value: "12 мес.", label: "срок окупаемости" },
    ],
    cta: "Запросить аналогичный проект для кафе",
  },
  {
    category: "Ресторан",
    title: "Ресторан «Gourmet House», 150 мест",
    subtitle: "Снижение ошибок сборки и перерасхода продуктов на 20 %",
    before: "Много ошибок сборки, перерасход продуктов, непредсказуемые расходы.",
    after: "IoT‑система, интеграция с CRM и POS‑системами, обучение персонала.",
    results: [
      { icon: TrendingDown, value: "20%", label: "снижение ошибок и перерасхода" },
      { icon: Zap, value: "15%", label: "сокращение времени обслуживания" },
      { icon: Clock, value: "15 мес.", label: "срок окупаемости" },
    ],
    cta: "Запросить аналогичный проект для ресторана",
  },
  {
    category: "Сеть ресторанов",
    title: "Сеть «Culinary Group», 8 ресторанов",
    subtitle: "Снижение операционных расходов на 30 % в сети",
    before: "Разные стандарты, хаос в управлении кухнями, высокие операционные расходы.",
    after: "Единая IoT‑платформа, централизованная аналитика, обучение персонала.",
    results: [
      { icon: TrendingDown, value: "30%", label: "снижение операционных расходов" },
      { icon: Zap, value: "20%", label: "сокращение простоев" },
      { icon: Clock, value: "18 мес.", label: "срок окупаемости" },
    ],
    cta: "Запросить аналогичный проект для сети",
  },
  {
    category: "Кухня‑сервис",
    title: "Кухня‑сервис «FoodHub»",
    subtitle: "Удвоение производительности кухни за 10 месяцев",
    before: "Перегрузка персонала, перерасход продуктов, низкая производительность.",
    after: "IoT‑контроль, мониторинг и автоматизация workflow, обучение персонала.",
    results: [
      { icon: Zap, value: "×2", label: "производительность кухни" },
      { icon: TrendingDown, value: "15%", label: "снижение перерасхода продуктов" },
      { icon: Clock, value: "10 мес.", label: "срок окупаемости" },
    ],
    cta: "Запросить аналогичный проект для кухни‑сервиса",
  },
];

export default function CasesPage() {
  return (
    <>
      <section className="gradient-hero text-primary-foreground py-14 md:py-20">
        <div className="container-tight px-4 md:px-8">
          <h1 className="font-display font-bold text-3xl md:text-5xl mb-4">Кейсы внедрения Rest‑Tech</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl">
            Как мы снижаем операционные расходы на 15–40 % за счёт профессионального оборудования и IoT‑контроля.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-tight space-y-8">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl shadow-card border border-border overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">{c.category}</span>
                <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mt-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-6">{c.subtitle}</p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">До внедрения Rest‑Tech:</p>
                    <p className="text-sm text-muted-foreground">{c.before}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">После внедрения:</p>
                    <p className="text-sm text-muted-foreground">{c.after}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {c.results.map((r) => (
                    <div key={r.label} className="bg-muted/50 rounded-xl p-4">
                      <r.icon className="w-5 h-5 text-accent mb-2" />
                      <p className="font-display font-bold text-xl text-foreground">{r.value}</p>
                      <p className="text-xs text-muted-foreground">{r.label}</p>
                    </div>
                  ))}
                </div>

                <Link to="/contacts">
                  <Button variant="accent" size="sm">
                    {c.cta} <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}

          <div className="text-center pt-8">
            <p className="text-muted-foreground mb-4">Хотите аналогичный результат для вашего заведения?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/calculator">
                <Button variant="accent" size="lg">
                  Рассчитать экономию <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/contacts">
                <Button variant="outline" size="lg">Связаться с Rest‑Tech</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
