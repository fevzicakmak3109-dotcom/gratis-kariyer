-- Turkcell Kariyer (Çağrı Merkezi): Supabase kurulumu
-- Başvurular, Firestore benzeri tek tablo olan fs_docs içinde `turkcell_applications`
-- koleksiyonunda tutulur. Aynı Supabase projesindeki diğer uygulamalar başka
-- koleksiyon adları kullandığı için veriler birbirine karışmaz.
-- SQL Editor'de bir kez çalıştırın; tekrar çalıştırmak güvenlidir.

create table if not exists public.fs_docs (
  collection text not null,
  id text collate "C" not null,
  data jsonb not null default '{}'::jsonb,
  primary key (collection, id)
);

-- Tabloya tarayıcıdan doğrudan erişim kapalı; uygulama yalnızca sunucuda service role ile erişir.
alter table public.fs_docs enable row level security;
revoke all on public.fs_docs from anon, authenticated;

create index if not exists fs_turkcell_created on public.fs_docs ((data ->> 'createdAt')) where collection = 'turkcell_applications';

-- Canlı ziyaretçi sayacı: `turkcell_presence` koleksiyonu (ziyaretçi başına tek satır,
-- yalnızca rastgele oturum kimliği ve son görülme zamanı). Eski satırlar otomatik silinir.
create index if not exists fs_turkcell_presence on public.fs_docs ((data ->> 'lastSeen')) where collection = 'turkcell_presence';

-- CV yükleme şu an kapalı (src/lib/positions.ts → CV_UPLOAD_ENABLED). Açılırsa
-- CV'ler için private bucket (en fazla 5 MB, yalnızca PDF / DOC / DOCX):
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('turkcell-cvs', 'turkcell-cvs', false, 5242880, array[
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
])
on conflict (id) do nothing;
