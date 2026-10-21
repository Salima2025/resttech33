import { motion } from "framer-motion";
import { Target, Users, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";
import portrait from "@/assets/pavel-lomakin.png.asset.json";
import { ORG, SITE } from "@/lib/schema";

const leader = {
  "@type": "Person",
  "@id": `${SITE}/about#pavel-lomakin`,
  name: "Павел Константинович Ломакин",
  jobTitle: "Руководитель Rest-Tech",
  url: `${SITE}/about#pavel-lomakin`,
  worksFor: ORG,
  knowsAbout: ["Ресторанный консалтинг", "Операционное управление", "Экономика меню", "Технологии HoReCa"],
};

const values = [
  { icon: Target, title: "Результат в цифрах", desc: "Мы измеряем успех проекта в процентах экономии и сроках окупаемости – не в красивых слайдах." },
  { icon: Users, title: "Команда практиков", desc: "Инженеры, шефы, IT-специалисты – каждый с опытом работы в HoReCa от 5 лет." },
  { icon: Award, title: "Полный цикл", desc: "От аудита до сопровождения. Мы не оставляем клиента с оборудованием без инструкций." },
];

export default function AboutPage() {
  return (
    <>
      <Seo
        title="О компании Rest-Tech – интегратор умной кухни"
        description="О Rest-Tech и руководителе Павле Константиновиче Ломакине: ресторанный консалтинг, операционное управление и взгляд на будущее HoReCa с новыми технологиями."
        path="/about"
        jsonLd={[
          { "@context": "https://schema.org", "@type": "AboutPage", url: `${SITE}/about`, name: "О компании Rest-Tech", mainEntity: leader },
          { "@context": "https://schema.org", "@type": "Article", "@id": `${SITE}/about#future-horeca`, headline: "Будущее HoReCa: технологии должны работать на прибыль", author: leader, publisher: ORG, inLanguage: "ru", mainEntityOfPage: `${SITE}/about#future-horeca` },
        ]}
      />
      <section className="gradient-hero text-primary-foreground py-14 md:py-20">
        <div className="container-tight px-4 md:px-8">
          <h1 className="font-display font-bold text-3xl md:text-5xl mb-4">О компании</h1>
          <p className="text-primary-foreground/90 text-lg max-w-2xl">
            Rest-Tech – интегратор умной кухни для HoReCa. Оборудование, IoT и консалтинг в одном решении.
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
              За 5 лет мы реализовали более 350 проектов – от одиночных кафе до федеральных сетей. Средняя экономия наших клиентов – 25% операционных расходов с окупаемостью от 2 до 4 месяцев.
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

          <div id="pavel-lomakin" className="scroll-mt-24 border-t border-border pt-12 mb-14 grid md:grid-cols-[260px_1fr] gap-8 md:gap-12 items-start">
            <img src={portrait.url} alt="Павел Константинович Ломакин, руководитель Rest-Tech" width={768} height={1154} loading="lazy" className="w-full max-w-[260px] aspect-[2/3] object-cover rounded-lg" />
            <div>
              <p className="text-accent font-semibold text-sm mb-3">Руководитель Rest-Tech</p>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-5">Павел Константинович Ломакин</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">Практик ресторанного консалтинга. Работает с диагностикой бизнеса, запуском заведений, антикризисным управлением, экономикой меню и закупок, управленческой отчётностью и командой.</p>
              <p className="text-muted-foreground leading-relaxed mb-5">В портфолио Павла – урегулирование конфликта между собственником и кухней ресторана «Коза Роза», работа с ценообразованием и продуктовой матрицей ресторанного проекта в Дубае. Его подход – согласовать исходные показатели, выбрать приоритеты и довести решения до внедрения вместе с командой.</p>
              <blockquote className="border-l-2 border-accent pl-5 text-lg font-display text-foreground">«Не гадаем – измеряем. Не выдаём отчёт и не исчезаем – помогаем довести решения до внедрения».</blockquote>
            </div>
          </div>

          <article id="future-horeca" aria-labelledby="future-horeca-title" className="scroll-mt-24 max-w-3xl mx-auto border-t border-border pt-10 mb-12">
            <p className="text-sm text-muted-foreground mb-3">Павел Константинович Ломакин · Мнение руководителя</p>
            <h2 id="future-horeca-title" className="font-display font-bold text-2xl md:text-3xl text-foreground mb-6">Будущее HoReCa: технологии должны работать на прибыль</h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>В моей работе с ресторанами я начинаю не с выбора оборудования и не с обещания увеличить выручку. Сначала важно понять, где бизнес теряет деньги и гостей: в закупках, меню, списаниях, организации кухни или взаимодействии команды. Цифры полезны только тогда, когда за ними можно увидеть причину и принять решение.</p>
              <p>Мой опыт включает задачи, которые нельзя решить одним отчётом. В «Козе Розе» пришлось помогать собственнику и кухне находить договорённости, чтобы сохранить работу команды. В ресторанном проекте в Дубае я предложил рассматривать цены отдельных блюд вместе с себестоимостью и продуктовой матрицей, а не повышать всё меню одновременно. Для меня это один принцип: изменения должны учитывать реальную работу заведения.</p>
              <h3 className="font-display font-semibold text-xl text-foreground">От отдельных приборов к управляемой кухне</h3>
              <p>Будущее HoReCa я вижу в связке оборудования, данных и людей. IoT-датчики могут помочь раньше заметить отклонение температуры или необычное энергопотребление. Аналитика и инструменты искусственного интеллекта – сопоставить закупки, продажи и списания. Но уведомление само по себе ничего не исправляет: нужен сотрудник, понятный порядок действий и контроль результата.</p>
              <h3 className="font-display font-semibold text-xl text-foreground">Внедрять по задаче, а не ради технологии</h3>
              <p>Я за поэтапный подход. Сначала фиксируем исходную ситуацию, затем выбираем несколько приоритетных изменений, обучаем команду и сравниваем показатели. Оцениваем не только стоимость покупки, но и обслуживание, простои, нагрузку на персонал и окупаемость. Новая система должна упрощать работу, а не создавать ещё один отчёт, который никто не читает.</p>
              <p>Для Rest-Tech умная кухня – это не ресторан без людей. Это ресторан, где собственник видит происходящее, команда понимает свои действия, а технологии помогают сохранять качество и управлять расходами. Именно такую устойчивую, измеримую работу я считаю будущим отрасли.</p>
            </div>
          </article>

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
