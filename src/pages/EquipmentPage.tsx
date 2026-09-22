import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Wrench, ShieldCheck, Truck, ArrowRight, Flame, Snowflake, Zap, Coffee, WashingMachine, Recycle } from "lucide-react";
import Seo from "@/components/Seo";
import { ORG, service, faq } from "@/lib/schema";

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
      <Seo
        title="Оборудование для HoReCa – Rest-Tech"
        description="Тепловое, холодильное, посудомоечное и барное оборудование для ресторанов и кафе. Гарантия до 3 лет, монтаж, доставка по РФ/СНГ."
        path="/solutions/equipment"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "OfferCatalog",
            name: "Каталог оборудования для HoReCa Rest-Tech",
            url: "https://resttech33.lovable.app/solutions/equipment",
            provider: ORG,
            itemListElement: categories.map((c, i) => ({
              "@type": "Offer",
              position: i + 1,
              priceCurrency: "RUB",
              availability: "https://schema.org/InStock",
              warranty: { "@type": "WarrantyPromise", durationOfWarranty: { "@type": "QuantitativeValue", value: 3, unitCode: "ANN" } },
              itemOffered: {
                "@type": "Product",
                name: c.name,
                category: "Профессиональное оборудование для HoReCa",
                brand: { "@type": "Brand", name: "Rest-Tech" },
              },
            })),
          },
          service({
            name: "Поставка, монтаж и сервис оборудования для HoReCa",
            description:
              "Подбор нового и б/у оборудования с проверкой, гарантией до 3 лет, монтажом, пусконаладкой и доставкой по РФ и СНГ.",
            path: "/solutions/equipment",
            serviceType: "Поставка и монтаж кухонного оборудования",
            offers: benefits.map((b) => ({ name: b.title, description: b.desc })),
          }),
          faq([
            { q: "Какая гарантия на оборудование?", a: "До 3 лет – как на новое, так и на проверенное б/у оборудование." },
            { q: "Выполняете ли вы монтаж?", a: "Да, наши инженеры выполняют установку, подключение и пусконаладку." },
            { q: "Куда осуществляется доставка?", a: "По России и СНГ собственной логистикой." },
          ]),
        ]}
      />
      <section className="gradient-hero text-primary-foreground py-14 md:py-20">
        <div className="container-tight px-4 md:px-8">
          <h1 className="font-display font-bold text-3xl md:text-5xl mb-4">Оборудование для HoReCa</h1>
          <p className="text-primary-foreground/90 text-lg max-w-2xl">
            Новое и б/у оборудование с проверкой, гарантией и полным сервисом – от печей до холодильных систем.
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
                Выбор оборудования для кухни – это риск: несовместимость, перерасход бюджета, поставщики без гарантий, простои из-за поломок. Особенно если вы открываете новую точку или масштабируете сеть.
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
            <p className="text-primary-foreground/90 text-sm mb-5">
              Сравните вариант комплексного внедрения ресторанных технологий – оборудование станет частью умной системы.
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
