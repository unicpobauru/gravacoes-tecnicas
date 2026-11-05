# Gravações Técnicas · UniCPO

Calendário das gravações dos vídeos técnicos dos cursos UniCPO.

## Como funciona
1. Todo começo de mês, clique em **Subir cronograma** e envie a PNG com os cursos dos próximos 4 meses.
2. O Claude lê a imagem e mostra: cursos **novos** (precisa gravar), cursos que **mudaram de data** e cursos que **saíram** do cronograma. Você revisa e aplica.
3. Cada curso vira uma caixinha na coluna **A gravar**, agrupada por coordenador (com foto).
4. Escreva na caixinha quem vai gravar e **arraste para o dia marcado** no calendário.
5. O calendário mostra, mês a mês, quais cursos têm o **vídeo 1** a publicar (3 meses antes do início) e o **vídeo 2** (no mês do curso).

## Dados
- Ficam salvos no navegador (localStorage). Use **Backup** para baixar/restaurar um `.json`.
- A chave da API da Anthropic fica só no navegador e não entra no backup.
- Sem chave, use a aba **Colar dados** (`Curso ; Coordenador ; dd/mm/aaaa`).
