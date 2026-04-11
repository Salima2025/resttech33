import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TrendingDown, Clock, Users, ArrowRight } from "lucide-react";

const cases = [
  {
    category: "Сеть ресторанов",
    title: "Сеть «Вкус Города» — 12 точек",
    problem: "Потеря 15% заказов из-за хаоса на кухне, высокий перерасход продуктов.",
    solution: "Внедрение IoT-мониторинга + замена 60% оборудования + обучение персонала.",
    results: [
      { icon: TrendingDown, value: "28%", label: "снижение потерь продуктов" },
      { icon: Clock, value: "15 мин", label: "ускорение отдачи в пик" },
      { icon: Users, value: "3 мес.", label: "срок окупаемости" },
    ],
  },
  {
    category: "Ресторан",
    title: "Ресторан «Нарцисс» — 180 мест",
    problem: "Постоянные простои из-за перегрева оборудования, высокие счета за электричество.",
    solution: "Аудит кухни + IoT-датчики температуры + замена 3 единиц оборудования на энергоэффективные.",
    results: [
      { icon: TrendingDown, value: "35%", label: "снижение расходов на энергию" },
      { icon: Clock, value: "0", label: "простоев за 6 месяцев" },
      { icon: Users, value: "4 мес.", label: "срок окупаемости" },
    ],
  },
  {
    category: "Кухня-сервис",
    title: "Кухня-сервис «FastFood Lab»",
    problem: "Ошибки сборки доставочных заказов до 12%, высокие возвраты.",
    solution: "Автоматизация сборки через IoT-экосистему + обучение операторов.",
    results: [
      { icon: TrendingDown, value: "2%", label: "ошибки сборки (было 12%)" },
      { icon: Clock, value: "40%", label: "быстрее сборка заказа" },
      { icon: Users, value: "2 мес.", label: "срок окупаемости" },
    ],
  },
];

export default function CasesPage() {
  return (
    <>
      <section className="gradient-hero text-primary-foreground py-14 md:py-20">
        <div className="container-tight px-4 md:px-8">
          <h1 className="font-display font-bold text-3xl md:text-5xl mb-4">Кейсы</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl">
            Реальные результаты наших клиентов: цифры, решения и сроки окупаемости.
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
                <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mt-2 mb-4">{c.title}</h3>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">Проблема:</p>
                    <p className="text-sm text-muted-foreground">{c.problem}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">Решение:</p>
                    <p className="text-sm text-muted-foreground">{c.solution}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {c.results.map((r) => (
                    <div key={r.label} className="bg-muted/50 rounded-xl p-4">
                      <r.icon className="w-5 h-5 text-accent mb-2" />
                      <p className="font-display font-bold text-xl text-foreground">{r.value}</p>
                      <p className="text-xs text-muted-foreground">{r.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          <div className="text-center pt-8">
            <p className="text-muted-foreground mb-4">Хотите аналогичный результат для вашего заведения?</p>
            <Link to="/calculator">
              <Button variant="accent" size="lg">
                Запросить аналогичный проект <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
