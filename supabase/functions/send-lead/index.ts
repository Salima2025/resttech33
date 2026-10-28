import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { createOpenAI } from 'npm:@ai-sdk/openai@2';
import { streamText } from 'npm:ai@5';

const AI_GATEWAY = 'https://ai.gateway.lovable.dev/v1';
const AI_MODEL = 'openai/gpt-6-astra';
const AI_INSTRUCTIONS = `Ты – менеджер Rest-Tech, B2B-интегратора умной кухни для HoReCa (оборудование, проектирование кухни, оснащение под ключ, IoT-контроль, консалтинг и обучение). Пиши первый ответ клиенту на его заявку для мессенджера.
Правила:
- Деловой, вежливый тон, обращение на «вы» и по имени, без маркетинговых штампов и восклицаний.
- Учитывай тип заведения, стадию проекта и суть запроса; предложи конкретный следующий шаг (короткий созвон, выезд инженера, запрос планировки или меню).
- Задай 2–3 уточняющих вопроса, нужных для расчёта, – только тех данных, которых нет в заявке.
- Не обещай цены, сроки, скидки и проценты экономии. Не придумывай факты о компании.
- Длина: 50–100 слов, без markdown.
- Подпись: «Rest-Tech, +7 (916) 603-40-63».
Выведи только текст сообщения.`;

async function draftReply(apiKey: string, leadText: string): Promise<string> {
  let runId: string | undefined;
  const provider = createOpenAI({
    baseURL: AI_GATEWAY, apiKey,
    headers: { 'Lovable-API-Key': apiKey, 'X-Lovable-AIG-SDK': 'vercel-ai-sdk' },
    fetch: async (input, init) => {
      const headers = new Headers(init?.headers);
      if (runId) headers.set('X-Lovable-AIG-Run-ID', runId);
      const res = await fetch(input, { ...init, headers });
      runId ??= res.headers.get('X-Lovable-AIG-Run-ID')?.trim() || undefined;
      if (!res.ok) console.error(`AI gateway [${res.status}]: ${await res.clone().text()}`);
      return res;
    },
  });
  const result = streamText({
    model: provider.responses(AI_MODEL),
    system: AI_INSTRUCTIONS,
    messages: [{ role: 'user', content: leadText }],
    onError: ({ error }) => console.error('AI stream error:', error),
    providerOptions: { openai: { store: false, forceReasoning: true, reasoningEffort: 'low', reasoningSummary: 'auto', include: ['reasoning.encrypted_content'] } },
  });
  return (await result.text).trim();
}

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/telegram';

function esc(v: unknown) {
  return String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const TELEGRAM_API_KEY = Deno.env.get('TELEGRAM_API_KEY');
    const TELEGRAM_CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID');
    if (!LOVABLE_API_KEY || !TELEGRAM_API_KEY || !TELEGRAM_CHAT_ID) {
      return new Response(JSON.stringify({ error: 'Telegram is not configured' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json().catch(() => null) as Record<string, unknown> | null;
    if (!body || typeof body !== 'object') {
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Honeypot: bots fill hidden "website" field
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const source = String(body.source ?? 'Сайт').slice(0, 100);
    const name = String(body.name ?? '').trim().slice(0, 200);
    const email = String(body.email ?? '').trim().slice(0, 200);
    const phone = String(body.phone ?? '').trim().slice(0, 100);
    const message = String(body.message ?? '').trim().slice(0, 2000);
    const fields = (body.fields && typeof body.fields === 'object' && !Array.isArray(body.fields))
      ? body.fields as Record<string, unknown> : {};

    if (!name || (!email && !phone)) {
      return new Response(JSON.stringify({ error: 'Укажите имя и email или телефон' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    try {
      const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
      const { error: dbErr } = await sb.from('lead_submissions').insert({ source, name, email: email || null, phone: phone || null, message: message || null, fields });
      if (dbErr) console.error('lead insert failed:', dbErr.message);
    } catch (e) { console.error('lead insert exception:', e); }

    const lines = [
      `🔔 <b>Новая заявка Rest-Tech</b>`,
      `<b>Источник:</b> ${esc(source)}`,
      `<b>Имя:</b> ${esc(name)}`,
      email ? `<b>Email:</b> ${esc(email)}` : '',
      phone ? `<b>Телефон:</b> ${esc(phone)}` : '',
      ...Object.entries(fields)
        .filter(([, v]) => v !== '' && v != null && !(Array.isArray(v) && v.length === 0))
        .slice(0, 20)
        .map(([k, v]) => `<b>${esc(k)}:</b> ${esc(Array.isArray(v) ? v.join(', ') : v)}`),
      message ? `<b>Сообщение:</b> ${esc(message)}` : '',
      `<i>${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })} МСК</i>`,
    ].filter(Boolean);

    // Quick-action buttons
    const contactRaw = [phone, String(fields['Telegram'] ?? fields['telegram'] ?? '')].join(' ');
    const digits = phone.replace(/\D/g, '');
    const waDigits = digits.length === 11 && digits.startsWith('8') ? '7' + digits.slice(1)
      : digits.length === 10 ? '7' + digits : digits;
    const tgMatch = contactRaw.match(/(?:t\.me\/|@)([A-Za-z0-9_]{5,32})/);
    const buttons: { text: string; url: string }[] = [];
    if (waDigits.length >= 10 && waDigits.length <= 15) {
      buttons.push({ text: '💬 WhatsApp', url: `https://wa.me/${waDigits}` });
    }
    if (tgMatch) buttons.push({ text: '✈️ Telegram', url: `https://t.me/${tgMatch[1]}` });
    if (email) buttons.push({ text: '✉️ Email', url: `mailto:${email}` });
    if (waDigits.length >= 10) lines.splice(lines.length - 1, 0, `📞 Позвонить: +${waDigits}`);

    const tgRes = await fetch(`${GATEWAY_URL}/sendMessage`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': TELEGRAM_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID, text: lines.join('\n'), parse_mode: 'HTML',
        ...(buttons.length ? { reply_markup: { inline_keyboard: [buttons] } } : {}),
      }),
    });

    const text = await tgRes.text();
    if (!tgRes.ok) {
      console.error(`Telegram request failed [${tgRes.status}]: ${text}`);
      return new Response(JSON.stringify({ error: 'Telegram request failed', status: tgRes.status, details: text }), {
        status: tgRes.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const parsed = JSON.parse(text);
    if (parsed?.ok === false) {
      console.error('Telegram API error:', text);
      return new Response(JSON.stringify({ error: 'Telegram API error', details: parsed }), {
        status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Background: AI draft of the first reply, posted as a reply to the lead message
    const replyTo = parsed?.result?.message_id;
    const plainLead = [`Источник: ${source}`, `Имя: ${name}`,
      ...Object.entries(fields).filter(([, v]) => v !== '' && v != null).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`),
      message ? `Сообщение: ${message}` : ''].filter(Boolean).join('\n');
    const job = (async () => {
      try {
        const draft = await draftReply(LOVABLE_API_KEY, plainLead);
        if (!draft) return;
        const kb: { text: string; url: string }[] = [];
        if (waDigits.length >= 10 && waDigits.length <= 15) {
          kb.push({ text: '💬 Отправить в WhatsApp', url: `https://wa.me/${waDigits}?text=${encodeURIComponent(draft).slice(0, 1900)}` });
        }
        if (tgMatch) kb.push({ text: '✈️ Открыть Telegram', url: `https://t.me/${tgMatch[1]}` });
        if (email) kb.push({ text: '✉️ Отправить email', url: `mailto:${email}?subject=${encodeURIComponent('Rest-Tech: ответ на заявку')}&body=${encodeURIComponent(draft).slice(0, 1500)}` });
        const r = await fetch(`${GATEWAY_URL}/sendMessage`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, 'X-Connection-Api-Key': TELEGRAM_API_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID, parse_mode: 'HTML',
            text: `🤖 <b>Черновик ответа клиенту</b> (нажмите на текст, чтобы скопировать):\n\n<code>${esc(draft)}</code>`,
            ...(replyTo ? { reply_parameters: { message_id: replyTo } } : {}),
            ...(kb.length ? { reply_markup: { inline_keyboard: kb.map((b) => [b]) } } : {}),
          }),
        });
        if (!r.ok) console.error(`Draft send failed [${r.status}]: ${await r.text()}`);
      } catch (e) { console.error('draft job error:', e); }
    })();
    // @ts-ignore EdgeRuntime is provided by Supabase
    if (typeof EdgeRuntime !== 'undefined') EdgeRuntime.waitUntil(job); else await job;

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('send-lead error:', e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
