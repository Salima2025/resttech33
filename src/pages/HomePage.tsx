import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Wrench, Cpu, GraduationCap, TrendingDown, Clock, ShieldCheck, ChevronRight, Ruler } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import heroImg from "@/assets/hero-kitchen.jpg";
import Seo from "@/components/Seo";
import eqOven from "@/assets/equipment-combi-oven.jpg";
import eqFridge from "@/assets/equipment-fridge.jpg";
import eqDish from "@/assets/equipment-dishwasher.jpg";
import eqGriddle from "@/assets/equipment-griddle.jpg";
import eqCoffee from "@/assets/equipment-coffee.jpg";
import ClientsMarquee from "@/components/ClientsMarquee";
import WorkProcess from "@/components/home/WorkProcess";
import LeadForm from "@/components/leads/LeadForm";
import { useLeadDialog } from "@/components/leads/LeadDialogProvider";
import { Truck, PenTool, Settings, Users, Activity, CheckCircle2 } from "lucide-react";

const turnkey = [
  { icon: PenTool, t: "Проект", d: "Расстановка, кВт, вода, вентиляция" },
  { icon: Truck, t: "Поставка", d: "Прямые контракты с производителями" },
  { icon: Settings, t: "Монтаж", d: "Подключение и пусконаладка" },
  { icon: Users, t: "Обучение", d: "Персонал и регламенты" },
  { icon: Wrench, t: "Сервис", d: "Гарантия и регламентное ТО" },
  { icon: Activity, t: "IoT", d: "Мониторинг температур и энергии" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6 } }),
};

const services = [
  {
    icon: Wrench,
    title: "Оборудование",
    desc: "Профессиональное оборудование для любого формата HoReCa – с гарантией, монтажом и обучением.",
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
    desc: "IoT-мониторинг, датчики, тревоги, интеграция с CRM/POS – полная автоматизация кухни «под ключ».",
    href: "/solutions/iot",
    cta: "Узнать о технологиях",
  },
  {
    icon: GraduationCap,
    title: "Консалтинг и обучение",
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

const audiences = [
  { label: "Кафе 40–120 мест", href: "/solutions/equipment" },
  { label: "Ресторан 120–250 мест", href: "/solutions/equipment" },
  { label: "Сеть 5–10+ точек", href: "/solutions/iot" },
  { label: "Кухня‑сервис / столовая", href: "/solutions/equipment" },
];

const carouselItems = [
  { img: eqOven, title: "Пароконвектоматы", alt: "Профессиональные пароконвектоматы для ресторанов" },
  { img: eqFridge, title: "Холодильное оборудование", alt: "Промышленное холодильное оборудование для кухни" },
  { img: eqGriddle, title: "Тепловое оборудование", alt: "Промышленное тепловое оборудование HoReCa" },
  { img: eqDish, title: "Посудомоечные машины", alt: "Профессиональные посудомоечные машины для ресторанов" },
  { img: eqCoffee, title: "Кофейное оборудование", alt: "Профессиональное кофейное оборудование для кофеен" },
];

export default function HomePage() {
  const open = useLeadDialog();
  return (
    <>
      <Seo
        title="Rest-Tech – Интегратор умной кухни для HoReCa"
        description="B2B-интегратор HoReCa: оборудование, IoT и консалтинг. Снижаем операционные расходы ресторанов на 15–40%. 350+ проектов."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Rest-Tech",
          url: "https://resttech33.lovable.app/",
          logo: "https://resttech33.lovable.app/favicon.ico",
          description: "B2B-интегратор умной кухни для HoReCa: оборудование, IoT и консалтинг.",
          areaServed: "RU",
        }}
      />
      {/* Hero with photo background */}
      <section className="relative overflow-hidden text-primary-foreground">
        <img
          src={heroImg}
          alt="Профессиональная кухня ресторана"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/80" />
        <div className="container-tight relative z-10 py-20 md:py-32 px-4 md:px-8">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl">
            <motion.div custom={0} variants={fadeUp} className="mb-8 flex items-center gap-2 md:gap-3">
              <h1 className="font-display font-extrabold leading-none tracking-tight text-[clamp(1.5rem,4.5vw,3.5rem)]">
                <span className="text-[hsl(217_100%_60%)]">REST</span>
                <span className="text-primary-foreground">-</span>
                <span className="text-accent">TECH</span>
                <span className="sr-only"> – Интегратор умной кухни для HoReCa</span>
              </h1>
            </motion.div>
            <motion.p custom={1} variants={fadeUp} className="text-2xl md:text-4xl font-display font-semibold text-primary-foreground mb-4 leading-tight">
              Оснащаем кафе, рестораны и сети профессиональным оборудованием и IoT-технологиями
            </motion.p>
            <motion.p custom={2} variants={fadeUp} className="text-lg text-primary-foreground/90 mb-8 max-w-2xl">
              Проектируем кухню, поставляем оборудование, монтируем, обучаем персонал и снижаем операционные расходы на 15–40%.
            </motion.p>
            <motion.div custom={3} variants={fadeUp} className="flex flex-wrap gap-4 mb-8">
              <Button variant="hero" size="lg" onClick={() => open("kit")}>
                Рассчитать комплектацию кухни <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button variant="heroOutline" size="lg" onClick={() => open("project24")}>Получить проект за 24 часа</Button>
            </motion.div>
            <motion.ul custom={4} variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-foreground/90">
              {["350+ проектов", "15–40% экономия", "6–18 мес. окупаемость IoT", "Гарантия и сервис"].map((m) => (
                <li key={m} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent" />{m}</li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card border-b border-border">
        <div className="container-tight px-4 md:px-8 py-10 md:py-14">
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mb-8 md:mb-10">
            Профессиональное оборудование и технологии для ресторанов, кафе и столовых. Снижаем операционные расходы на <span className="text-accent font-semibold">15–40 %</span> благодаря экспертной поддержке и комплексным решениям на каждом этапе.
          </p>
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
            <p className="text-primary-foreground/90 max-w-xl mx-auto">
              Профессиональные линейки тепла, холода, посудомойки и бара – с гарантией, монтажом и сервисом.
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
                        alt={it.alt}
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

      {/* Our Projects – Clients logo wall */}
      {/* Turnkey */}
      <section className="section-padding bg-background">
        <div className="container-tight grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Один подрядчик – одна гарантия</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">Оснащение кухни под ключ</h2>
            <p className="text-muted-foreground mb-6">Вместо 5–7 поставщиков – один договор, фиксированная смета и график. Отвечаем за результат от пустого помещения до работающей кухни.</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/osnashchenie-pod-klyuch"><Button variant="accent" size="lg">Подробнее об услуге <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
              <Button variant="outline" size="lg" onClick={() => open("audit")}>Заказать аудит кухни</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {turnkey.map((x) => (
              <div key={x.t} className="bg-card rounded-2xl p-4 border border-border shadow-card">
                <x.icon className="w-6 h-6 text-accent mb-3" />
                <p className="font-display font-semibold text-foreground">{x.t}</p>
                <p className="text-xs text-muted-foreground">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WorkProcess />

      <section id="projects" className="section-padding bg-background scroll-mt-20">
        <div className="container-tight">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">Наши проекты</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              С нами работают сети, рестораны, бары, кофейни и службы доставки.
            </p>
          </div>
          <ClientsMarquee />
          <div className="text-center mt-10">
            <Link to="/cases">
              <Button variant="accent" size="lg">
                Смотреть готовые решения <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA form */}
      <section id="lead" className="section-padding gradient-hero text-primary-foreground scroll-mt-20">
        <div className="container-tight grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Рассчитать инвестиции в кухню</h2>
            <p className="text-primary-foreground/90 text-lg mb-6">Пришлите параметры – подготовим спецификацию, смету и график поставки за 1 рабочий день.</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/calculator"><Button variant="heroOutline" size="lg">Калькулятор ROI</Button></Link>
              <Button variant="heroOutline" size="lg" onClick={() => open("iot")}>Расчёт IoT-системы</Button>
            </div>
          </div>
          <div className="bg-card text-foreground rounded-2xl p-6 md:p-8 shadow-elevated">
            <LeadForm kind="kit" />
          </div>
        </div>
      </section>
    </>
  );
}
