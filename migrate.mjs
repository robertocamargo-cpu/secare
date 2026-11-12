// Cria as tabelas do SECARE no Neon (Postgres). Executa: npm run db:migrate
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
try{process.loadEnvFile(path.join(root,'.env'))}catch{}
const url=(process.env.DATABASE_URL||'').trim();
if(!url){console.error('DATABASE_URL não encontrado no .env.\n1) Crie um projeto em https://console.neon.tech\n2) Copie a connection string (postgres://...)\n3) Adicione no .env: DATABASE_URL=postgres://...\n4) Rode novamente: npm run db:migrate');process.exit(1)}
const {Pool}=await import('pg');
const pool=new Pool({connectionString:url,ssl:{rejectUnauthorized:false}});
const sql=`
CREATE TABLE IF NOT EXISTS projetos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  video_nome text,
  duracao numeric,
  modelo text,
  criado_em timestamptz NOT NULL DEFAULT now(),
  atualizado_em timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS cortes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  projeto_id uuid NOT NULL REFERENCES projetos(id) ON DELETE CASCADE,
  titulo text,
  arquetipo text,
  inicio numeric NOT NULL,
  fim numeric NOT NULL,
  nota numeric,
  resumo text,
  motivo text,
  abertura text,
  descricao text,
  comentario text,
  hashtags text[],
  status text NOT NULL DEFAULT 'sugerido' CHECK (status IN ('sugerido','gerado')),
  gerado_em timestamptz,
  criado_em timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_cortes_projeto ON cortes(projeto_id);
`;
try{await pool.query(sql);console.log('✓ Tabelas prontas no Neon (projetos, cortes).')}catch(e){console.error('Erro ao migrar:',e.message);process.exit(1)}finally{await pool.end()}
