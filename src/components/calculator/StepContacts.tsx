import type { CalcFormData } from "@/pages/CalculatorPage";

interface Props {
  form: CalcFormData;
  setForm: React.Dispatch<React.SetStateAction<CalcFormData>>;
}

const inputClass = "w-full mt-1 px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent";

export default function CalculatorStepContacts({ form, setForm }: Props) {
  return (
    <div>
      <h2 className="font-display font-bold text-2xl mb-2 text-foreground">Получите персональный отчёт</h2>
      <p className="text-muted-foreground mb-6 text-sm">Введите данные, чтобы мы направили вам PDF‑отчёт и коммерческое предложение Rest‑Tech.</p>
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-foreground">Имя *</span>
          <input type="text" value={form.name} onChange={(e) => setForm((d) => ({ ...d, name: e.target.value }))} placeholder="Алексей Иванов" className={inputClass} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-foreground">Email *</span>
          <input type="email" value={form.email} onChange={(e) => setForm((d) => ({ ...d, email: e.target.value }))} placeholder="alex@restaurant.ru" className={inputClass} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-foreground">Телефон</span>
          <input type="tel" value={form.phone} onChange={(e) => setForm((d) => ({ ...d, phone: e.target.value }))} placeholder="+7 (999) 123-45-67" className={inputClass} />
        </label>
        <label className="flex items-start gap-3 cursor-pointer pt-2">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => setForm((d) => ({ ...d, consent: e.target.checked }))}
            className="mt-1 w-4 h-4 accent-accent flex-shrink-0"
          />
          <span className="text-xs text-muted-foreground leading-relaxed">
            Я даю согласие на обработку персональных данных в соответствии с{" "}
            <a href="/legal/privacy" className="text-accent hover:underline">политикой обработки ПДн</a> и{" "}
            <a href="/legal/personal-data-consent" className="text-accent hover:underline">согласием на обработку ПДн</a>.
          </span>
        </label>
      </div>
      <p className="text-xs text-muted-foreground mt-4">Ответим в течение 24 часов, без спама.</p>
    </div>
  );
}
