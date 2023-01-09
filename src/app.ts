import { FastifyInstance } from 'fastify';

import { configPlugin, IConfigOpts } from '@/plugins/config';
import { corsPlugin, ICorsPluginOpts } from '@/plugins/cors';
import { prismaPlugin } from '@/plugins/prisma';
import { sensiblePlugin } from '@/plugins/sensible';
import { registerRoutes } from '@/routes';

export const appService = async function (app: FastifyInstance) {
  /**
   * ! Register positions are important
   */

  await app.register(configPlugin, {
    envsWhitelist: ['NODE_ENV', 'API_VERSION', 'DATABASE_URL'],
  } as IConfigOpts);

  await Promise.all([
    app.register(sensiblePlugin),
    app.register(corsPlugin, {
      credentials: true,
      origin: true,
    } as ICorsPluginOpts),
    app.register(prismaPlugin),
  ]);

  await app.register(registerRoutes, {
    prefix: `/api/v${app.cfg.get('API_VERSION') || 1}`,
  });
};
