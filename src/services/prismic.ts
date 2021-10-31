import Prismic from '@prismicio/client';
import { DefaultClient } from '@prismicio/client/types/client';

export function getPrismicClient(req?: unknown): DefaultClient {
  const prismic = Prismic.client(process.env.PRISMAC_API_ENDPOINT, {
    req,
    accessToken: process.env.PRISMAC_ACCESS_TOKEN,
  });

  return prismic;
}
