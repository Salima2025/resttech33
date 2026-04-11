import { motion } from "framer-motion";
import { Target, Users, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const values = [
  { icon: Target, title: "Результат в цифрах", desc: "Мы измеряем успех проекта в процентах экономии и сроках окупаемости — не в красивых слайдах." },
  { icon: Users, title: "Команда практиков", desc: "Инженеры, шефы, IT-специалисты — каждый с опытом работы в HoReCa от 5 лет." },
  { icon: Award, title: "Полный цикл", desc: "От аудита до сопровождения. Мы не оставляем клиента с оборудованием без инструкций." },
];

export default function AboutPage() {
  return (
    <>
      <section className="gradient-hero text-primary-foreground py-14 md:py-20">
        <div className="container-tight px-4 md:px-8">
          <h1 className="font-display font-bold text-3xl md:text-5xl mb-4">О компании</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl">
            Rest-Tech — интегратор умной кухни для HoReCa. Оборудование, IoT и консалтинг в одном решении.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-tight">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="font-display font-bold text-2xl text-foreground mb-4">Наша миссия</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Мы помогаем ресторанам, кафе и кухням-сервисам работать эффективнее. Не через «волшебные решения», а через системный подход: правильное оборудование, умную автоматизацию и обученный персонал.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              За 5 лет мы реализовали более 350 проектов — от одиночных кафе до федеральных сетей. Средняя экономия наших клиентов — 25% операционных расходов с окупаемостью от 2 до 4 месяцев.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-card"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/contacts">
              <Button variant="accent" size="lg">Обсудить проект <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
