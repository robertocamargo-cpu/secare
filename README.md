# SECARE

Aplicativo local para identificar e cortar trechos contínuos de vídeo. Requer Node.js 18+ e FFmpeg disponíveis no computador.

Inicie com `npm start` nesta pasta e acesse http://127.0.0.1:4178. Selecione um vídeo; para sugestões automáticas, forneça uma transcrição SRT/VTT com tempos e uma chave Gemini. O texto da transcrição é enviado ao Google; o vídeo permanece local. O modelo é configurável. O editor manual e o corte não exigem chave ou transcrição.

O aplicativo não gera transcrição automaticamente, não insere legendas nem converte para formato vertical. Resultados da IA precisam de revisão humana. Arquivos enviados e cortes gerados são mantidos em `data/`; limpe-os manualmente quando não forem mais necessários. Uso em computador local apenas; não exponha o servidor à internet.
