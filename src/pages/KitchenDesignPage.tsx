import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Ruler, Zap, LayoutGrid, ArrowRight, CheckCircle } from "lucide-react";
import blueprintImg from "@/assets/kitchen-blueprint.jpg";
import engineerImg from "@/assets/kitchen-design-engineer.jpg";
import layout3dImg from "@/assets/kitchen-3d-layout.jpg";

const steps = [
  { step: "01", title: "Замер и анализ", desc: "Выезд на объект или анализ планировки, определение требований к кухне." },
  { step: "02", title: "Проект расстановки", desc: "Оптимальная расстановка оборудования с учётом потоков, санитарных норм и эргономики." },
  { step: "03", title: "Расчёт мощностей", desc: "Электрика, вентиляция, водоснабжение — точный расчёт под выбранное оборудование." },
  { step: "04", title: "Подбор оборудования", desc: "Комплектация под ваш бюджет и формат: новое, б/у или комбинированное решение." },
  { step: "05", title: "Монтаж и запуск", desc: "Установка, подключение, пусконаладка и обучение персонала." },
];

const benefits = [
  "Экономия до 20% бюджета за счёт правильной расстановки",
  "Соответствие санитарным нормам и требованиям пожарной безопасности",
  "Оптимизация потоков: сырьё → приготовление → выдача",
  "Точный расчёт электрических мощностей и вентиляции",
  "Минимизация переделок и дополнительных затрат",
];

export default function KitchenDesignPage() {
  return (
    <>
      <section className="relative overflow-hidden text-primary-foreground py-14 md:py-20">
        <img src={engineerImg} alt="Инженер проектирует кухню ресторана" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-foreground/80" />
        <div className="container-tight px-4 md:px-8 relative z-10">
          <h1 className="font-display font-bold text-3xl md:text-5xl mb-4">Проектирование кухни</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Расстановка оборудования, расчёт мощностей, проект кухни под ваш формат заведения — от кафе до сети ресторанов.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-tight">
          {/* Visuals row */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl overflow-hidden border border-border shadow-card">
              <img src={blueprintImg} alt="Чертёж кухни с расстановкой оборудования" width={1280} height={800} loading="lazy" className="w-full h-64 md:h-80 object-cover" />
              <div className="p-5 bg-card">
                <p className="font-display font-bold text-foreground mb-1">Чертёж расстановки</p>
                <p className="text-sm text-muted-foreground">Размеры, зонирование, потоки сырья и готовых блюд.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-2xl overflow-hidden border border-border shadow-card">
              <img src={layout3dImg} alt="3D-визуализация кухни ресторана" width={1280} height={800} loading="lazy" className="w-full h-64 md:h-80 object-cover" />
              <div className="p-5 bg-card">
                <p className="font-display font-bold text-foreground mb-1">3D‑визуализация</p>
                <p className="text-sm text-muted-foreground">Объёмная модель кухни до начала монтажа.</p>
              </div>
            </motion.div>
          </div>

          {/* What you get */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: LayoutGrid, title: "Проект расстановки", desc: "Чертёж с размещением оборудования, потоками и зонированием кухни." },
              { icon: Zap, title: "Расчёт мощностей", desc: "Электрика, вентиляция, водоснабжение — всё под выбранное оборудование." },
              { icon: Ruler, title: "Подбор оборудования", desc: "Комплектация под бюджет: новое, б/у или комбинированное решение." },
            ].map((f, i) => (
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

          {/* Benefits */}
          <div className="bg-muted/50 rounded-2xl p-8 mb-16">
            <h2 className="font-display font-bold text-2xl text-foreground mb-6">Зачем проектировать кухню с Rest‑Tech</h2>
            <div className="space-y-3">
              {benefits.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">{b}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <h2 className="font-display font-bold text-2xl text-foreground mb-8 text-center">Этапы проектирования</h2>
          <div className="space-y-4 mb-16 max-w-2xl mx-auto">
            {steps.map((s, i) => (
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
                <Button variant="accent" size="lg">Заказать проект кухни <ArrowRight className="w-4 h-4 ml-1" /></Button>
              </Link>
              <Link to="/calculator">
                <Button variant="outline" size="lg">Калькулятор инвестиций</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
