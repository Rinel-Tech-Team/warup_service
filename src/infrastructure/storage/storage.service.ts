import { createClient, SupabaseClient } from '@supabase/supabase-js';

export class StorageService {
  private client: SupabaseClient;
  constructor(
    url: string,
    key: string,
    private bucket: string,
  ) {
    this.client = createClient(url, key);
  }

  async uploadMany(files: { path: string; bytes: Buffer }[]) {
    const results = await Promise.allSettled(
      files.map((f) =>
        this.client.storage
          .from(this.bucket)
          .upload(f.path, f.bytes, { upsert: true }),
      ),
    );
    return results.map((r) => (r.status === 'fulfilled' ? r.value : r.reason));
  }

  async uploadOne(file: { path: string; bytes: Buffer }) {
    const { data, error } = await this.client.storage
      .from(this.bucket)
      .upload(file.path, file.bytes, { upsert: true });

    if (error) throw error;
    return data;
  }

  async getPublicURL(path: string) {
    const { data } = this.client.storage.from(this.bucket).getPublicUrl(path);
    return data.publicUrl;
  }
}
