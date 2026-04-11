import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactsPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="gradient-hero text-primary-foreground py-14 md:py-20">
        <div className="container-tight px-4 md:px-8">
          <h1 className="font-display font-bold text-3xl md:text-5xl mb-4">Контакты</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl">
            Обсудим ваш проект, ответим на вопросы и подготовим коммерческое предложение.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-tight">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="font-display font-bold text-2xl text-foreground mb-6">Свяжитесь с нами</h2>
              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">Телефон</p>
                    <p className="text-sm text-muted-foreground">+7 (495) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">info@rest-tech.ru</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">Адрес</p>
                    <p className="text-sm text-muted-foreground">Москва, ул. Примерная, д. 10, офис 205</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-xl p-5">
                <p className="text-sm text-foreground font-semibold mb-2">Быстрый доступ:</p>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li>• <a href="/calculator" className="text-accent hover:underline">Калькулятор ROI</a> — оцените экономику за 2 минуты</li>
                  <li>• <a href="/cases" className="text-accent hover:underline">Кейсы</a> — посмотрите результаты клиентов</li>
                </ul>
              </div>
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {submitted ? (
                <div className="bg-card rounded-2xl p-8 border border-border shadow-card text-center">
                  <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="font-display font-bold text-xl text-foreground mb-2">Заявка отправлена!</h3>
                  <p className="text-sm text-muted-foreground">Мы свяжемся с вами в течение рабочего дня.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-card space-y-4"
                >
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">Обсудить проект</h3>
                  <label className="block">
                    <span className="text-sm font-medium text-foreground">Имя *</span>
                    <input required type="text" placeholder="Алексей Иванов"
                      className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-foreground">Email *</span>
                    <input required type="email" placeholder="alex@restaurant.ru"
                      className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-foreground">Телефон</span>
                    <input type="tel" placeholder="+7 (999) 123-45-67"
                      className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-foreground">Формат заведения</span>
                    <select className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                      <option value="">Выберите</option>
                      <option>Кафе</option>
                      <option>Ресторан</option>
                      <option>Бар</option>
                      <option>Сеть</option>
                      <option>Кухня-сервис</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-foreground">Сообщение</span>
                    <textarea rows={3} placeholder="Расскажите о вашем проекте..."
                      className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none" />
                  </label>
                  <Button variant="accent" size="lg" className="w-full" type="submit">
                    <Send className="w-4 h-4 mr-2" /> Отправить заявку
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
