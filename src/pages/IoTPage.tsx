import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Cpu, Wifi, BarChart3, Bell, ArrowRight, CheckCircle } from "lucide-react";

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

export default function IoTPage() {
  return (
    <>
      <section className="gradient-hero text-primary-foreground py-14 md:py-20">
        <div className="container-tight px-4 md:px-8">
          <h1 className="font-display font-bold text-3xl md:text-5xl mb-4">IoT-экосистема «под ключ»</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl">
            Полная автоматизация кухни: датчики, мониторинг, тревоги, интеграция с CRM/POS и отчётность.
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

          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contacts">
                <Button variant="accent" size="lg">Заказать аудит <ArrowRight className="w-4 h-4 ml-1" /></Button>
              </Link>
              <Link to="/calculator">
                <Button variant="outline" size="lg">Рассчитать ROI</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
