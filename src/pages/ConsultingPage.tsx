import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GraduationCap, ClipboardCheck, BookOpen, ArrowRight, CheckCircle, Users, UserCheck, Briefcase, Search } from "lucide-react";
import Seo from "@/components/Seo";

const staffing = [
  {
    icon: Briefcase,
    title: "Шеф‑повар / су‑шеф",
    desc: "Подбор шефов с опытом в нужной кухне и формате — в штат или на проект запуска.",
  },
  {
    icon: UserCheck,
    title: "Управляющий / директор",
    desc: "Опытные управляющие ресторанами и сетями. Запуск, операционка, KPI.",
  },
  {
    icon: Users,
    title: "Линейный персонал",
    desc: "Повара, бармены, официанты, посудомойщики — быстрое закрытие позиций под открытие.",
  },
  {
    icon: Search,
    title: "Внештатные эксперты",
    desc: "Технолог, аудитор, бренд‑шеф, консультант по меню — на проект или почасово.",
  },
];

const services = [
  {
    icon: ClipboardCheck,
    title: "Аудит кухни",
    desc: "Онлайн или офлайн обследование: находим точки потерь, ошибки процессов, проблемы с оборудованием.",
    details: ["Карта процессов кухни", "Анализ оборудования", "Отчёт с рекомендациями", "План оптимизации"],
  },
  {
    icon: GraduationCap,
    title: "Обучение персонала",
    desc: "Онлайн-модули и выездные тренинги для управляющих и шефов: как работать с IoT-данными и процессами.",
    details: ["Модуль для управляющих", "Модуль для шефов", "Работа с IoT-дашбордами", "Чек-листы эффективности"],
  },
  {
    icon: BookOpen,
    title: "Методические материалы",
    desc: "Чек-листы, скрипты, рейтинги эффективности столов — готовые инструменты для управления.",
    details: ["Чек-листы открытия/закрытия", "Скрипты для менеджеров", "KPI-карты для кухни", "Шаблоны отчётов"],
  },
];

const funnel = ["Мини-аудит (бесплатно)", "Полноценный аудит", "Внедрение системы", "Обучение и сопровождение"];

export default function ConsultingPage() {
  return (
    <>
      <section className="gradient-hero text-primary-foreground py-14 md:py-20">
        <div className="container-tight px-4 md:px-8">
          <h1 className="font-display font-bold text-3xl md:text-5xl mb-4">Консалтинг и обучение</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl">
            Аудит кухни, обучение персонала и методические инструменты для максимальной эффективности.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-tight">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-card"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <svc.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{svc.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{svc.desc}</p>
                <ul className="space-y-2">
                  {svc.details.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" /> {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Staffing block */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">Подбор персонала</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Закрываем ключевые позиции в штат и подбираем внештатных экспертов под проекты — от запуска точки до операционного управления сетью.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
              {staffing.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-2xl p-5 border border-border shadow-card"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                    <s.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-base text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="bg-muted/50 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <p className="font-display font-bold text-foreground mb-1">Нужен персонал под запуск или замену?</p>
                <p className="text-sm text-muted-foreground">Подберём кандидатов из закрытой базы за 5–14 дней.</p>
              </div>
              <Link to="/contacts">
                <Button variant="accent">Запросить подбор <ArrowRight className="w-4 h-4 ml-1" /></Button>
              </Link>
            </div>
          </div>

          {/* Funnel */}
          <div className="bg-muted/50 rounded-2xl p-8 mb-12 max-w-2xl mx-auto">
            <h3 className="font-display font-bold text-xl text-foreground mb-6 text-center">Путь клиента</h3>
            <div className="space-y-3">
              {funnel.map((step, i) => (
                <div key={step} className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <span className="text-sm text-foreground font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link to="/contacts">
              <Button variant="accent" size="lg">Заказать аудит кухни <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
