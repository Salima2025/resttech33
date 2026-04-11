import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Cpu, Wifi, BarChart3, Bell, ArrowRight, CheckCircle, Building2 } from "lucide-react";

const stages = [
  { step: "01", title: "Аудит", desc: "Обследуем кухню, определяем точки потерь и приоритеты автоматизации." },
  { step: "02", title: "Проектирование", desc: "Разрабатываем архитектуру датчиков, интеграций и отчётности." },
  { step: "03", title: "Монтаж", desc: "Устанавливаем датчики, подключаем оборудование к платформе." },
  { step: "04", title: "Обучение", desc: "Учим персонал работать с данными и реагировать на тревоги." },
  { step: "05", title: "Сопровождение", desc: "Поддержка, обновления, анализ эффективности на постоянной основе." },
];

const features = [
  { icon: Wifi, title: "Мониторинг оборудования", desc: "Температура, нагрузка, время работы — всё в реальном времени." },
  { icon: Bell, title: "Тревоги и уведомления", desc: "Мгновенные оповещения о сбоях, перегреве, отклонениях." },
  { icon: BarChart3, title: "Аналитика и отчёты", desc: "Дашборды для управляющих: расходы, эффективность, KPI кухни." },
  { icon: Cpu, title: "Интеграция с CRM/POS", desc: "Связь с вашими системами учёта, R-Keeper, iiko и др." },
];

const packages = [
  {
    title: "IoT‑контроль для кафе 80–120 мест",
    desc: "Датчики на печи, жарочные поверхности, холодильники. Тревоги, аналитика, обучение персонала.",
    budget: "150–300 тыс ₽",
    payback: "6–12 месяцев",
    cta: "Запросить пакет для кафе",
  },
  {
    title: "IoT‑контроль для ресторана 120–200 мест",
    desc: "Датчики, тревоги, аналитика, интеграция с CRM/POS, обучение персонала.",
    budget: "250–500 тыс ₽",
    payback: "12–18 месяцев",
    cta: "Запросить пакет для ресторана",
  },
  {
    title: "IoT‑платформа для сети 5–10+ точек",
    desc: "Единая платформа для всех точек: централизованная аналитика, мониторинг, тревоги, обучение персонала.",
    budget: "1–3 млн ₽",
    payback: "12–24 месяца",
    cta: "Запросить пакет для сети",
  },
  {
    title: "IoT‑контроль для кухни‑сервиса",
    desc: "Датчики, тревоги, аналитика, мониторинг логистики, обучение персонала.",
    budget: "300–700 тыс ₽",
    payback: "8–16 месяцев",
    cta: "Запросить пакет для кухни‑сервиса",
  },
];

export default function IoTPage() {
  return (
    <>
      <section className="gradient-hero text-primary-foreground py-14 md:py-20">
        <div className="container-tight px-4 md:px-8">
          <h1 className="font-display font-bold text-3xl md:text-5xl mb-4">IoT‑контроль и аналитика кухни Rest‑Tech</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl">
            Увеличьте экономическую эффективность уже купленного оборудования на 15–20 %. Мониторинг и управление кухнями в реальном времени.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-tight">
          {/* Features */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-card"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Effect */}
          <div className="bg-muted/50 rounded-2xl p-8 mb-16">
            <h2 className="font-display font-bold text-2xl text-foreground mb-6 text-center">Эффект для бизнеса</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "15–40%", label: "снижение операционных расходов" },
                { value: "20–30%", label: "сокращение времени простоев" },
                { value: "10–25%", label: "снижение ошибок и перерасхода" },
                { value: "6–18 мес.", label: "срок окупаемости" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display font-bold text-2xl text-accent">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stages */}
          <h2 className="font-display font-bold text-2xl text-foreground mb-8 text-center">Этапы внедрения</h2>
          <div className="space-y-4 mb-16 max-w-2xl mx-auto">
            {stages.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                <span className="font-display font-bold text-2xl text-accent/30 flex-shrink-0 w-8">{s.step}</span>
                <div className="bg-card rounded-xl p-4 border border-border shadow-card flex-1">
                  <p className="font-semibold text-foreground text-sm">{s.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* IoT Packages */}
          <h2 className="font-display font-bold text-2xl text-foreground mb-3 text-center">Готовые IoT‑пакеты Rest‑Tech</h2>
          <p className="text-muted-foreground text-center mb-8 text-sm">Выберите готовое решение под ваш формат заведения</p>
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-card flex flex-col"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Building2 className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{pkg.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{pkg.desc}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span>Бюджет: <strong className="text-foreground">{pkg.budget}</strong></span>
                  <span>Окупаемость: <strong className="text-foreground">{pkg.payback}</strong></span>
                </div>
                <Link to="/contacts">
                  <Button variant="accent" size="sm" className="w-full">
                    {pkg.cta} <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contacts">
                <Button variant="accent" size="lg">Запросить IoT‑аудит <ArrowRight className="w-4 h-4 ml-1" /></Button>
              </Link>
              <Link to="/calculator">
                <Button variant="outline" size="lg">Рассчитать экономию</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
