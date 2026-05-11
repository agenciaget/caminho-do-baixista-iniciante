/**
 * POST /api/subscribe
 * 1. Cria/atualiza contato no ActiveCampaign
 * 2. Adiciona à lista "Leads" e aplica tag "CBI - Cadastrado"
 * 3. Dispara evento Lead via Meta Conversions API (server-side)
 */

const crypto = require('crypto');

const AC_URL    = process.env.AC_URL;
const AC_KEY    = process.env.AC_KEY;
const META_TOKEN = process.env.META_TOKEN;
const PIXEL_ID  = '247588052918756';

/* ── SHA-256 para hashing de dados de usuário (Conversions API) ── */
const sha256 = (str) =>
  crypto.createHash('sha256').update(str.trim().toLowerCase()).digest('hex');

/* ── Helper ActiveCampaign ── */
async function ac(path, options = {}) {
  const res = await fetch(`${AC_URL}/api/3${path}`, {
    ...options,
    headers: { 'Api-Token': AC_KEY, 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`AC ${path} → ${res.status}: ${text}`);
  }
  return res.json();
}

/* ── Helper Meta Conversions API ── */
async function sendMetaLead({ email, phone, firstName, lastName, clientIp, clientUserAgent }) {
  if (!META_TOKEN) return; // sem token configurado, ignora silenciosamente

  const payload = {
    data: [{
      event_name:       'Lead',
      event_time:       Math.floor(Date.now() / 1000),
      action_source:    'website',
      event_source_url: 'https://cbi.diegorandi.com/',
      user_data: {
        em:  [sha256(email)],
        ph:  [sha256(phone.replace(/\D/g, ''))],
        fn:  [sha256(firstName)],
        ...(lastName ? { ln: [sha256(lastName)] } : {}),
        ...(clientIp        ? { client_ip_address: clientIp }        : {}),
        ...(clientUserAgent ? { client_user_agent: clientUserAgent }  : {}),
      },
    }],
    access_token: META_TOKEN,
  };

  const res = await fetch(
    `https://graph.facebook.com/v19.0/${PIXEL_ID}/events`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
  );

  if (!res.ok) {
    const text = await res.text();
    console.warn('[Meta CAPI] Erro ao enviar Lead:', res.status, text);
  }
}

/* ── Handler principal ── */
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Método não permitido.' });

  const { name, email, phone } = req.body || {};

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Preencha todos os campos.' });
  }

  try {
    /* ── 1. SYNC CONTATO (ActiveCampaign) ── */
    const [firstName, ...rest] = name.trim().split(' ');
    const lastName = rest.join(' ');

    const syncData = await ac('/contact/sync', {
      method: 'POST',
      body: JSON.stringify({
        contact: { email, firstName, lastName, phone },
      }),
    });

    const contactId = syncData?.contact?.id;
    if (!contactId) throw new Error('ID do contato não retornado pelo ActiveCampaign.');

    /* ── 2. LISTA "Leads" ── */
    const listsData = await ac('/lists?filters[name]=Leads&limit=50');
    const list = listsData?.lists?.find(l => l.name === 'Leads');

    if (list) {
      await ac('/contactLists', {
        method: 'POST',
        body: JSON.stringify({
          contactList: { list: list.id, contact: contactId, status: 1 },
        }),
      });
    } else {
      console.warn('[AC] Lista "Leads" não encontrada.');
    }

    /* ── 3. TAG "CBI - Cadastrado" ── */
    const tagsData = await ac('/tags?search=CBI&limit=100');
    let tag = tagsData?.tags?.find(t => t.tag === 'CBI - Cadastrado');

    if (!tag) {
      const newTag = await ac('/tags', {
        method: 'POST',
        body: JSON.stringify({
          tag: {
            tag: 'CBI - Cadastrado',
            tagType: 'contact',
            description: 'Cadastrado no evento O Caminho do Baixista Iniciante',
          },
        }),
      });
      tag = newTag?.tag;
    }

    if (tag?.id) {
      await ac('/contactTags', {
        method: 'POST',
        body: JSON.stringify({
          contactTag: { contact: contactId, tag: tag.id },
        }),
      });
    }

    /* ── 4. META CONVERSIONS API — Lead (server-side) ── */
    // Fire-and-forget: não bloqueia a resposta ao usuário em caso de falha
    sendMetaLead({
      email,
      phone,
      firstName,
      lastName,
      clientIp:        req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress,
      clientUserAgent: req.headers['user-agent'],
    }).catch(err => console.warn('[Meta CAPI]', err.message));

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('[subscribe] Erro:', err.message);
    return res.status(500).json({ error: 'Erro ao registrar. Tente novamente.' });
  }
};
