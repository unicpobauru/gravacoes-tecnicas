/**
 * Gravações Técnicas · UniCPO — armazenamento na Planilha Google
 *
 * Como implantar:
 * 1. Crie uma planilha nova no Google Drive (ex.: "Gravações Técnicas UniCPO").
 * 2. Menu Extensões → Apps Script. Apague o que estiver lá e cole TODO este arquivo. Salve (ícone de disquete).
 * 3. Botão azul "Implantar" → "Nova implantação" → engrenagem → "App da Web".
 *      Executar como: Eu
 *      Quem pode acessar: Qualquer pessoa
 *    Clique em "Implantar" e autorize com a sua conta (Avançado → Acessar ... (não seguro) é normal: o script é seu).
 * 4. Copie o "URL do app da Web" (termina em /exec) e cole no site em ⚙ Configurações → Link da planilha.
 *
 * Se alterar este código depois: Implantar → Gerenciar implantações → lápis → Versão: "Nova versão" → Implantar
 * (assim o link continua o mesmo).
 */

const ABA_ESTADO = '_estado';   // dados completos do site (oculta, não editar)
const ABA_CURSOS = 'Cursos';    // tabela legível, reescrita a cada salvamento
const TAM = 40000;              // limite de caracteres por célula é 50.000

function doGet() {
  const sh = SpreadsheetApp.getActive().getSheetByName(ABA_ESTADO);
  let txt = '';
  if (sh && sh.getLastRow() > 0) {
    txt = sh.getRange(1, 1, sh.getLastRow(), 1).getValues()
      .map(r => String(r[0]).slice(1)) // tira o "x" de proteção
      .join('');
  }
  return saida(txt || '{}');
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const txt = e.postData.contents;
    const S = JSON.parse(txt); // valida antes de gravar
    const ss = SpreadsheetApp.getActive();

    // 1) Tabela legível
    const cs = ss.getSheetByName(ABA_CURSOS) || ss.insertSheet(ABA_CURSOS, 0);
    cs.clear();
    const nome = {};
    (S.coordinators || []).forEach(c => nome[c.id] = c.name);
    const STATUS = { a_contatar: 'A contatar', contatado: 'Contatado', agendado: 'Agendado', gravado: 'Gravado (falta editar)', editado: 'Editado e pronto', cancelado: 'Cancelado' };
    const linhas = [['Curso', 'Coordenador', 'Início do curso', 'Quem grava', 'Telefone', 'Data da gravação', 'Status', 'Data da 1ª postagem', '1ª postagem publicada', 'Data da 2ª postagem', '2ª postagem publicada', 'Observações']];
    (S.courses || []).slice()
      .sort((a, b) => String(a.start || '').localeCompare(String(b.start || '')))
      .forEach(c => linhas.push([
        c.name || '', nome[c.coordId] || '', br(c.start), c.teacher || '', c.phone || '',
        br(c.recordDate) + (c.recordTime ? ' ' + c.recordTime : ''), STATUS[c.status] || c.status || '',
        br(c.v1Post), c.v1Pub ? 'sim' : '', br(c.v2Post), c.v2Pub ? 'sim' : '', c.notes || ''
      ]));
    const rg = cs.getRange(1, 1, linhas.length, linhas[0].length);
    rg.setNumberFormat('@');
    rg.setValues(linhas);
    cs.getRange(1, 1, 1, linhas[0].length).setFontWeight('bold');
    cs.setFrozenRows(1);

    // 2) Estado completo (em pedaços; cada um começa com "x" para o Sheets nunca interpretar como fórmula/número)
    const sh = ss.getSheetByName(ABA_ESTADO) || ss.insertSheet(ABA_ESTADO);
    sh.clear();
    const partes = [];
    for (let i = 0; i < txt.length; i += TAM) partes.push(['x' + txt.slice(i, i + TAM)]);
    sh.getRange(1, 1, partes.length, 1).setNumberFormat('@').setValues(partes);
    if (!sh.isSheetHidden()) sh.hideSheet();

    return saida(JSON.stringify({ ok: true, em: new Date().toISOString() }));
  } catch (err) {
    return saida(JSON.stringify({ ok: false, erro: String(err) }));
  } finally {
    lock.releaseLock();
  }
}

function br(iso) {
  const m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : '';
}

function saida(txt) {
  return ContentService.createTextOutput(txt).setMimeType(ContentService.MimeType.JSON);
}
