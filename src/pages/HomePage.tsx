import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Wrench, Cpu, GraduationCap, TrendingDown, Clock, ShieldCheck, ChevronRight, Ruler } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import heroImg from "@/assets/hero-kitchen.jpg";
import eqOven from "@/assets/equipment-combi-oven.jpg";
import eqFridge from "@/assets/equipment-fridge.jpg";
import eqDish from "@/assets/equipment-dishwasher.jpg";
import eqGriddle from "@/assets/equipment-griddle.jpg";
import eqCoffee from "@/assets/equipment-coffee.jpg";

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
    icon: Ruler,
    title: "Спроектировать кухню",
    desc: "Расстановка оборудования, расчёт мощностей, проектирование кухни под ваш формат заведения.",
    href: "/solutions/design",
    cta: "Заказать проект кухни",
  },
  {
    icon: Cpu,
    title: "Ресторанные технологии",
    desc: "IoT-мониторинг, датчики, тревоги, интеграция с CRM/POS — полная автоматизация кухни «под ключ».",
    href: "/solutions/iot",
    cta: "Узнать о технологиях",
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

const projects = [
  {
    title: "Пекарня «Лепим‑Варим»",
    desc: "Комплексное оснащение пекарни: тепловое и холодильное оборудование, проект расстановки, запуск за 3 недели.",
    result: "Запуск с нуля за 21 день",
  },
  {
    title: "Корнер «Street Wok»",
    desc: "Готовое решение для фуд-корнера: компактное тепловое оборудование, вытяжка, проект мощностей.",
    result: "Окупаемость за 4 месяца",
  },
  {
    title: "Франшиза «Burger Lab»",
    desc: "Унифицированный комплект оборудования для 12 точек сети: стандартизация, логистика, монтаж.",
    result: "12 точек за 6 месяцев",
  },
];

const audiences = [
  { label: "Кафе 40–120 мест", href: "/solutions/equipment" },
  { label: "Ресторан 120–250 мест", href: "/solutions/equipment" },
  { label: "Сеть 5–10+ точек", href: "/solutions/iot" },
  { label: "Кухня‑сервис / столовая", href: "/solutions/equipment" },
];

const carouselItems = [
  { img: eqOven, title: "Пароконвектоматы" },
  { img: eqFridge, title: "Холодильное оборудование" },
  { img: eqGriddle, title: "Тепловое оборудование" },
  { img: eqDish, title: "Посудомоечные машины" },
  { img: eqCoffee, title: "Кофейное оборудование" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero with photo background */}
      <section className="relative overflow-hidden text-primary-foreground">
        <img src={heroImg} alt="Профессиональная кухня ресторана" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/80" />
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
              Профессиональное оборудование + ресторанные технологии и поддержка после продажи. Снижаем операционные расходы на 15–40 %.
            </motion.p>
            <motion.div custom={3} variants={fadeUp} className="flex flex-wrap gap-4">
              <Link to="/solutions/equipment">
                <Button variant="hero" size="lg">
                  Посмотреть оборудование <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/calculator">
                <Button variant="heroOutline" size="lg">Калькулятор инвестиций</Button>
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

      {/* Equipment Carousel */}
      <section className="bg-foreground text-primary-foreground py-14 md:py-20">
        <div className="container-tight px-4 md:px-8">
          <div className="text-center mb-10">
            <p className="text-accent font-display font-semibold text-sm tracking-wider uppercase mb-3">Топовое оборудование</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-3">Что мы поставляем</h2>
            <p className="text-primary-foreground/70 max-w-xl mx-auto">
              Профессиональные линейки тепла, холода, посудомойки и бара — с гарантией, монтажом и сервисом.
            </p>
          </div>
          <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[Autoplay({ delay: 3500, stopOnInteraction: false })]}
            className="w-full"
          >
            <CarouselContent>
              {carouselItems.map((it) => (
                <CarouselItem key={it.title} className="md:basis-1/2 lg:basis-1/3">
                  <div className="rounded-2xl overflow-hidden border border-primary-foreground/10 bg-card group">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={it.img}
                        alt={it.title}
                        width={800}
                        height={600}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5 bg-card text-foreground">
                      <p className="font-display font-bold">{it.title}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="text-center mt-8">
            <Link to="/solutions/equipment">
              <Button variant="hero" size="lg">Посмотреть всё оборудование <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-muted/30">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">Экономия вашего заведения: оборудование и технологии</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Каждое направление работает самостоятельно, но вместе они дают максимальный эффект.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, i) => (
              <motion.div key={svc.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <Link to={svc.href} className="group block bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 border border-border hover:border-accent/30 h-full">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                    <svc.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-3">{svc.title}</h3>
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

      {/* Our Projects */}
      <section id="projects" className="section-padding bg-background scroll-mt-20">
        <div className="container-tight">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-10 text-center">Наши проекты</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="bg-card rounded-2xl p-6 shadow-card border border-border">
                <h3 className="font-display font-bold text-lg text-foreground mb-3">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{p.desc}</p>
                <div className="bg-accent/10 rounded-lg px-4 py-2">
                  <p className="text-sm font-semibold text-accent">{p.result}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/cases">
              <Button variant="accent" size="lg">
                Смотреть все готовые решения <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-hero text-primary-foreground">
        <div className="container-tight text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Готовы оптимизировать вашу кухню?</h2>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-xl mx-auto">
            Рассчитайте инвестиции за 2 минуты или получите готовый проект для вашего заведения.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/calculator">
              <Button variant="hero" size="lg">Калькулятор инвестиций <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </Link>
            <Link to="/contacts">
              <Button variant="heroOutline" size="lg">Получить готовый проект</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
