import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

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

    const tgRes = await fetch(`${GATEWAY_URL}/sendMessage`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': TELEGRAM_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: lines.join('\n'), parse_mode: 'HTML' }),
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
