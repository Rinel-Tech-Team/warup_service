import Redis from 'ioredis';

export class RedisService {
  private client: Redis;
  constructor(url: string) {
    this.client = new Redis(url, {
      lazyConnect: true,
      maxRetriesPerRequest: 3,
    });
  }
  getClient() {
    return this.client;
  }

  async setJson(key: string, value: unknown, ttlSeconds?: number) {
    const v = JSON.stringify(value);
    if (ttlSeconds) {
      return this.client.set(key, v, 'EX', ttlSeconds);
    }
    return this.client.set(key, v);
  }

  async getJSON<T>(key: string): Promise<T | null> {
    const v = await this.client.get(key);
    return v ? (JSON.parse(v) as T) : null;
  }

  async del(key: string | string[]) {
    return this.client.del(key as any);
  }
}
