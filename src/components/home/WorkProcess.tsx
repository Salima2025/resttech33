const steps = [
  "Заявка или бриф",
  "Аудит объекта и планировки",
  "Техническое задание и концепция кухни",
  "Подбор оборудования и расчёт мощностей",
  "Смета и график поставки",
  "Монтаж и пусконаладка",
  "Обучение персонала",
  "Сервис и IoT-мониторинг",
];

export default function WorkProcess() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-tight">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">Как мы работаем</h2>
        <p className="text-muted-foreground mb-10 max-w-2xl">8 этапов с фиксированными сроками и ответственностью на каждом шаге.</p>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <li key={s} className="relative bg-card rounded-2xl p-5 border border-border">
              <span className="font-display font-bold text-3xl text-accent/80">{String(i + 1).padStart(2, "0")}</span>
              <p className="font-medium text-foreground mt-2">{s}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
