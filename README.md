# Gravações Técnicas · UniCPO

Calendário das gravações dos vídeos técnicos dos cursos UniCPO.

Site: https://unicpobauru.github.io/gravacoes-tecnicas/ (os dados ficam na Planilha Google configurada em ⚙ Configurações; nada de dados neste repositório).

## Como funciona
1. Todo começo de mês, clique em **Subir cronograma** e envie a PNG com os cursos dos próximos 4 meses.
2. O Gemini (chave gratuita do Google AI Studio) lê a imagem, puxa o coordenador do cadastro e mostra: cursos **novos** (precisa gravar), cursos que **mudaram de data** e cursos que **saíram** do cronograma. Você revisa e aplica.
3. Cada curso vira uma caixinha na coluna **A gravar**, agrupada por coordenador (com foto).
4. Escreva na caixinha quem vai gravar e **arraste para o dia marcado** no calendário.
5. O calendário mostra, mês a mês, quais cursos têm a **1ª postagem** (3 meses antes do início) e a **2ª postagem** (no mês do curso). Os dois vídeos são gravados juntos e não têm ordem: qualquer um pode sair primeiro.

## Dados
- Ficam salvos no navegador (localStorage). Use **Backup** para baixar/restaurar um `.json`.
- A chave do Gemini fica só no navegador e não entra no backup.
- Sem chave, use a aba **Colar dados** (`Curso ; Coordenador ; dd/mm/aaaa`).
