import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Wrench, GraduationCap, TrendingDown, Clock, ShieldCheck, ChevronRight, Quote } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6 } }),
};

const services = [
  {
    icon: Wrench,
    title: "Оборудование",
    desc: "Профессиональное оборудование для любого формата HoReCa — с гарантией, монтажом и обучением.",
    href: "/solutions/equipment",
    cta: "Посмотреть оборудование",
  },
  {
    icon: Cpu,
    title: "IoT‑экосистема",
    desc: "Мониторинг, датчики, тревоги, интеграция с CRM/POS — полная автоматизация кухни «под ключ».",
    href: "/solutions/iot",
    cta: "Запустить IoT‑систему",
  },
  {
    icon: GraduationCap,
    title: "Консалтинг & обучение",
    desc: "Аудит кухни, обучение персонала, внедрение стандартов эффективности и экономии.",
    href: "/solutions/consulting",
    cta: "Заказать аудит",
  },
];

const stats = [
  { value: "15–40%", label: "снижение операционных расходов", icon: TrendingDown },
  { value: "6–18 мес.", label: "срок окупаемости IoT‑системы", icon: Clock },
  { value: "350+", label: "успешных проектов в HoReCa", icon: ShieldCheck },
];

const testimonials = [
  {
    quote: "После внедрения IoT‑системы от Rest‑Tech мы сократили простои на кухне на 25 % и снизили операционные расходы на 18 %.",
    name: "Михаил Сергеев",
    role: "Управляющий, кафе «Urban Brew»",
  },
  {
    quote: "Интеграция с CRM и POS‑системами позволила снизить ошибки сборки и перерасход продуктов на 20 %. Окупились за 15 месяцев.",
    name: "Анна Козлова",
    role: "Операционный директор, «Gourmet House»",
  },
  {
    quote: "Единая IoT‑платформа для 8 ресторанов снизила операционные расходы на 30 %. Рекомендуем Rest‑Tech всем сетям.",
    name: "Дмитрий Волков",
    role: "CEO, «Culinary Group»",
  },
];

const audiences = [
  { label: "Кафе 40–120 мест", href: "/solutions/equipment" },
  { label: "Ресторан 120–250 мест", href: "/solutions/equipment" },
  { label: "Сеть 5–10+ точек", href: "/solutions/iot" },
  { label: "Кухня‑сервис / столовая", href: "/solutions/equipment" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(220_50%_25%/0.5),transparent_70%)]" />
        <div className="container-tight relative z-10 py-20 md:py-32 px-4 md:px-8">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl">
            <motion.p custom={0} variants={fadeUp} className="text-accent font-display font-semibold text-sm tracking-wider uppercase mb-4">
              Интегратор умной кухни для HoReCa
            </motion.p>
            <motion.h1 custom={1} variants={fadeUp} className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
              Оборудование для ресторанов, кафе и столовых{" "}
              <span className="text-accent">от Rest‑Tech</span>
            </motion.h1>
            <motion.p custom={2} variants={fadeUp} className="text-lg md:text-xl text-primary-foreground/75 mb-8 max-w-2xl">
              Профессиональное оборудование + IoT‑контроль и поддержка после продажи. Снижаем операционные расходы на 15–40 %.
            </motion.p>
            <motion.div custom={3} variants={fadeUp} className="flex flex-wrap gap-4">
              <Link to="/solutions/equipment">
                <Button variant="hero" size="lg">
                  Посмотреть оборудование <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/calculator">
                <Button variant="heroOutline" size="lg">Рассчитать экономию</Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card border-b border-border">
        <div className="container-tight px-4 md:px-8 py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-display font-bold text-2xl text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">Для каких заведений подбираем оборудование</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {audiences.map((a, i) => (
              <Link key={a.label} to={a.href}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-2xl p-5 border border-border shadow-card hover:border-accent/30 transition-colors text-center group"
                >
                  <p className="font-display font-semibold text-sm text-foreground group-hover:text-accent transition-colors">{a.label}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-muted/30">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">Экономия вашего заведения: оборудование и IoT‑контроль</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Каждое направление работает самостоятельно, но вместе они дают максимальный эффект.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <motion.div key={svc.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <Link to={svc.href} className="group block bg-card rounded-2xl p-6 md:p-8 shadow-card hover:shadow-elevated transition-all duration-300 border border-border hover:border-accent/30 h-full">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                    <svc.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-3">{svc.title}</h3>
                  <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{svc.desc}</p>
                  <span className="inline-flex items-center text-sm font-semibold text-accent group-hover:gap-2 transition-all">
                    {svc.cta} <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-10 text-center">Отзывы наших клиентов</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="bg-card rounded-2xl p-6 shadow-card border border-border">
                <Quote className="w-8 h-8 text-accent/30 mb-4" />
                <p className="text-foreground text-sm leading-relaxed mb-5">«{t.quote}»</p>
                <div>
                  <p className="font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-hero text-primary-foreground">
        <div className="container-tight text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Готовы оптимизировать вашу кухню?</h2>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-xl mx-auto">
            Рассчитайте экономию за 2 минуты и получите персональный отчёт для вашего заведения.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/calculator">
              <Button variant="hero" size="lg">Рассчитать экономию <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </Link>
            <Link to="/contacts">
              <Button variant="heroOutline" size="lg">Связаться с Rest‑Tech</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
