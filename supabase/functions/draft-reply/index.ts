import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createOpenAI } from 'npm:@ai-sdk/openai@2';
import { streamText } from 'npm:ai@5';
import { z } from 'npm:zod@3';

const GATEWAY = 'https://ai.gateway.lovable.dev/v1';
const MODEL = 'openai/gpt-6-astra';
const RUN_ID = 'X-Lovable-AIG-Run-ID';

const Body = z.object({
  accessCode: z.string().min(1).max(200),
  lead: z.object({
    name: z.string().trim().max(200).optional().default(''),
    venue: z.string().trim().max(200).optional().default(''),
    stage: z.string().trim().max(200).optional().default(''),
    city: z.string().trim().max(200).optional().default(''),
    request: z.string().trim().min(1, 'Опишите запрос клиента').max(4000),
    channel: z.enum(['telegram', 'whatsapp', 'email']).default('whatsapp'),
  }),
});

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

const INSTRUCTIONS = `Ты – менеджер Rest-Tech, B2B-интегратора умной кухни для HoReCa (оборудование, проектирование кухни, оснащение под ключ, IoT-контроль, консалтинг и обучение). Пиши первый ответ клиенту на его заявку.
Правила:
- Деловой, вежливый тон, обращение на «вы», без маркетинговых штампов и восклицаний.
- Учитывай тип заведения, стадию проекта и суть запроса; предложи конкретный следующий шаг (короткий созвон, выезд инженера, запрос планировки или меню).
- Задай 2–3 уточняющих вопроса, нужных для расчёта (площадь, мощность кВт, меню, количество чеков в день, сроки, бюджет) – только те, которых нет в заявке.
- Не обещай цены, сроки, скидки и проценты экономии, которых нет в заявке. Не придумывай факты о компании.
- Длина: 60–120 слов для мессенджера, до 180 слов для email (с темой письма в первой строке «Тема: …»).
- Подпись: «Rest-Tech, +7 (916) 603-40-63».
Выведи только текст сообщения.`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  const apiKey = Deno.env.get('LOVABLE_API_KEY');
  const code = Deno.env.get('MANAGER_ACCESS_CODE');
  if (!apiKey || !code) return json({ error: 'Функция не настроена' }, 500);

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return json({ error: parsed.error.issues[0]?.message ?? 'Некорректные данные' }, 400);
  if (!safeEqual(parsed.data.accessCode, code)) return json({ error: 'Неверный код доступа' }, 401);

  const l = parsed.data.lead;
  const prompt = `Канал ответа: ${l.channel}
Имя клиента: ${l.name || 'не указано'}
Тип заведения: ${l.venue || 'не указан'}
Стадия проекта: ${l.stage || 'не указана'}
Город: ${l.city || 'не указан'}
Запрос клиента / данные заявки:
${l.request}`;

  let runId: string | undefined;
  const provider = createOpenAI({
    baseURL: GATEWAY,
    apiKey,
    headers: { 'Lovable-API-Key': apiKey, 'X-Lovable-AIG-SDK': 'vercel-ai-sdk' },
    fetch: async (input, init) => {
      const headers = new Headers(init?.headers);
      if (runId) headers.set(RUN_ID, runId);
      const res = await fetch(input, { ...init, headers });
      runId ??= res.headers.get(RUN_ID)?.trim() || undefined;
      if (!res.ok) {
        const body = await res.clone().text();
        console.error(`AI gateway [${res.status}]: ${body}`);
      }
      return res;
    },
  });

  try {
    let upstreamError: unknown;
    const result = streamText({
      model: provider.responses(MODEL),
      system: INSTRUCTIONS,
      messages: [{ role: 'user', content: prompt }],
      abortSignal: req.signal,
      onError: ({ error }) => { upstreamError = error; },
      providerOptions: {
        openai: {
          store: false,
          forceReasoning: true,
          reasoningEffort: 'low',
          reasoningSummary: 'auto',
          include: ['reasoning.encrypted_content'],
        },
      },
    });
    const text = (await result.text).trim();
    if (!text) {
      const status = (upstreamError as { statusCode?: number })?.statusCode ?? 502;
      const msg = status === 402 ? 'Закончились AI-кредиты рабочего пространства. Пополните баланс в настройках.'
        : status === 429 ? 'Слишком много запросов, попробуйте через минуту.'
        : status === 403 ? 'Доступ к модели запрещён настройками рабочего пространства.'
        : 'Модель не вернула ответ. Попробуйте ещё раз позже.';
      return json({ error: msg }, status);
    }
    return json({ reply: text });
  } catch (e) {
    const status = (e as { statusCode?: number })?.statusCode ?? 500;
    console.error('draft-reply error:', e);
    return json({ error: status === 402 ? 'Закончились AI-кредиты рабочего пространства.' : 'Не удалось подготовить ответ' }, status);
  }
});
