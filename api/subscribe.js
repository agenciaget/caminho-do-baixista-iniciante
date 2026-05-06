/**
 * POST /api/subscribe
 * Registra o contato no ActiveCampaign:
 *  - Cria/atualiza o contato (sync)
 *  - Adiciona à lista "Leads"
 *  - Aplica a tag "CBI - Cadastrado"
 */

const AC_URL = process.env.AC_URL;
const AC_KEY = process.env.AC_KEY;

async function ac(path, options = {}) {
  const res = await fetch(`${AC_URL}/api/3${path}`, {
    ...options,
    headers: {
      'Api-Token': AC_KEY,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`AC ${path} → ${res.status}: ${text}`);
  }
  return res.json();
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido.' });

  const { name, email, phone } = req.body || {};

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Preencha todos os campos.' });
  }

  try {
    /* ── 1. SYNC CONTATO ── */
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

    /* ── 2. ADICIONAR À LISTA "Leads" ── */
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
      console.warn('[AC] Lista "Leads" não encontrada. Contato criado sem lista.');
    }

    /* ── 3. TAG "CBI - Cadastrado" ── */
    const tagsData = await ac('/tags?search=CBI&limit=100');
    let tag = tagsData?.tags?.find(t => t.tag === 'CBI - Cadastrado');

    if (!tag) {
      const newTag = await ac('/tags', {
        method: 'POST',
        body: JSON.stringify({
          tag: { tag: 'CBI - Cadastrado', tagType: 'contact', description: 'Cadastrado no evento O Caminho do Baixista Iniciante' },
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

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('[AC Integration Error]', err.message);
    return res.status(500).json({ error: 'Erro ao registrar. Tente novamente.' });
  }
};
