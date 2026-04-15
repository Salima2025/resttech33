import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Wrench, ShieldCheck, Truck, ArrowRight, Flame, Snowflake, Zap, Coffee, WashingMachine, Recycle } from "lucide-react";

const categories = [
  { name: "Тепловое оборудование", icon: Flame },
  { name: "Холодильное оборудование", icon: Snowflake },
  { name: "Электромеханическое оборудование", icon: Zap },
  { name: "Кофейное и барное оборудование", icon: Coffee },
  { name: "Посудомоечное оборудование", icon: WashingMachine },
  { name: "Б/у оборудование", icon: Recycle },
];

const benefits = [
  { icon: ShieldCheck, title: "Гарантия до 3 лет", desc: "На новое и б/у оборудование" },
  { icon: Wrench, title: "Монтаж и подключение", desc: "Наши инженеры установят всё" },
  { icon: Truck, title: "Доставка по РФ/СНГ", desc: "Собственная логистика" },
];

export default function EquipmentPage() {
  return (
    <>
      <section className="gradient-hero text-primary-foreground py-14 md:py-20">
        <div className="container-tight px-4 md:px-8">
          <h1 className="font-display font-bold text-3xl md:text-5xl mb-4">Оборудование для HoReCa</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl">
            Новое и б/у оборудование с проверкой, гарантией и полным сервисом — от печей до холодильных систем.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-tight">
          {/* Problem → Solution */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="font-display font-bold text-2xl text-foreground mb-4">Проблема</h2>
              <p className="text-muted-foreground leading-relaxed">
                Выбор оборудования для кухни — это риск: несовместимость, перерасход бюджета, поставщики без гарантий, простои из-за поломок. Особенно если вы открываете новую точку или масштабируете сеть.
              </p>
            </div>
            <div>
              <h2 className="font-display font-bold text-2xl text-foreground mb-4">Наше решение</h2>
              <p className="text-muted-foreground leading-relaxed">
                Мы подбираем оборудование под ваш формат, бюджет и тип кухни. Каждая единица проходит проверку, поставляется с гарантией и может быть интегрирована в систему мониторинга.
              </p>
            </div>
          </div>

          {/* Categories */}
          <h2 className="font-display font-bold text-2xl text-foreground mb-6">Категории оборудования</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-xl p-5 border border-border shadow-card hover:shadow-elevated hover:border-accent/30 transition-all cursor-pointer group"
              >
                <cat.icon className="w-6 h-6 text-accent mb-3 group-hover:scale-110 transition-transform duration-200" />
                <p className="font-semibold text-foreground text-sm group-hover:text-accent transition-colors">{cat.name}</p>
              </motion.div>
            ))}
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {benefits.map((b) => (
              <div key={b.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <b.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{b.title}</p>
                  <p className="text-xs text-muted-foreground">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Cross-sell */}
          <div className="bg-navy rounded-2xl p-8 text-primary-foreground">
            <h3 className="font-display font-bold text-xl mb-3">Хотите не просто купить, а автоматизировать кухню?</h3>
            <p className="text-primary-foreground/70 text-sm mb-5">
              Сравните вариант комплексного внедрения ресторанных технологий — оборудование станет частью умной системы.
            </p>
            <Link to="/solutions/iot">
              <Button variant="hero" size="lg">
                Узнать о ресторанных технологиях <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
