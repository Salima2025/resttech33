import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Copy, Sparkles } from "lucide-react";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent";
const CODE_KEY = "rt-manager-code";

export default function ManagerReplyPage() {
  const [code, setCode] = useState(() => sessionStorage.getItem(CODE_KEY) ?? "");
  const [lead, setLead] = useState({ name: "", venue: "", stage: "", city: "", request: "", channel: "whatsapp" });
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k: keyof typeof lead) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setLead((s) => ({ ...s, [k]: e.target.value }));

  const generate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead.request.trim()) return toast.error("Вставьте текст заявки или запрос клиента");
    setLoading(true);
    sessionStorage.setItem(CODE_KEY, code);
    const { data, error } = await supabase.functions.invoke("draft-reply", { body: { accessCode: code, lead } });
    setLoading(false);
    if (error) {
      let msg = error.message;
      if (error instanceof FunctionsHttpError) {
        try { msg = (await error.context.json()).error ?? msg; } catch { /* keep default */ }
      }
      return toast.error(msg);
    }
    setReply(data.reply);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <Helmet><title>Черновик ответа клиенту – Rest-Tech</title><meta name="robots" content="noindex, nofollow" /></Helmet>
      <h1 className="font-display font-bold text-3xl text-foreground mb-2">Черновик первого ответа клиенту</h1>
      <p className="text-muted-foreground mb-8">Вставьте данные заявки из Telegram – AI подготовит персональный ответ с учётом формата, стадии и запроса. Проверьте текст перед отправкой.</p>
      <form onSubmit={generate} className="space-y-4">
        <label className="block"><span className="text-sm font-medium text-foreground">Код доступа менеджера *</span>
          <input type="password" value={code} onChange={(e) => setCode(e.target.value)} className={input} autoComplete="off" /></label>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block"><span className="text-sm font-medium text-foreground">Имя клиента</span><input value={lead.name} onChange={set("name")} className={input} /></label>
          <label className="block"><span className="text-sm font-medium text-foreground">Тип заведения</span><input value={lead.venue} onChange={set("venue")} placeholder="Кофейня" className={input} /></label>
          <label className="block"><span className="text-sm font-medium text-foreground">Стадия проекта</span><input value={lead.stage} onChange={set("stage")} placeholder="Помещение есть, ремонт" className={input} /></label>
          <label className="block"><span className="text-sm font-medium text-foreground">Город</span><input value={lead.city} onChange={set("city")} className={input} /></label>
        </div>
        <label className="block"><span className="text-sm font-medium text-foreground">Текст заявки / запрос клиента *</span>
          <textarea rows={6} value={lead.request} onChange={set("request")} placeholder="Можно вставить сообщение из Telegram целиком" className={`${input} resize-y`} /></label>
        <label className="block"><span className="text-sm font-medium text-foreground">Куда отвечаем</span>
          <select value={lead.channel} onChange={set("channel")} className={input}>
            <option value="whatsapp">WhatsApp</option><option value="telegram">Telegram</option><option value="email">Email</option>
          </select></label>
        <Button variant="accent" size="lg" type="submit" disabled={loading || !code} className="w-full">
          <Sparkles className="w-4 h-4 mr-2" />{loading ? "Готовим ответ…" : "Подготовить ответ"}
        </Button>
      </form>
      {reply && (
        <div className="mt-8 rounded-xl border border-border bg-card p-6">
          <textarea value={reply} onChange={(e) => setReply(e.target.value)} rows={10} className={`${input} resize-y`} />
          <Button variant="outline" className="mt-3" onClick={() => { navigator.clipboard.writeText(reply); toast.success("Скопировано"); }}>
            <Copy className="w-4 h-4 mr-2" />Скопировать
          </Button>
        </div>
      )}
    </div>
  );
}
