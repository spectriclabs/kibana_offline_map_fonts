import fs from 'fs';
import path from 'path';
import { schema } from '@kbn/config-schema';
import { IRouter } from '../../../../src/core/server';
export function defineRoutes(router: IRouter) {
  router.get(
    {
      path: '/internal/maps/fonts/Open%20Sans%20Regular,Arial%20Unicode%20MS%20Regular/{range}',
      validate: {
        params: schema.object({
          range: schema.string(),
        }),
      },
    },
    async (context, request, response) => {
      const range = path.normalize(request.params.range);
      const rootPath = path.resolve(__dirname, 'fonts');
      const fontPath = path.resolve(rootPath, `${range}.pbf`);
      return !fontPath.startsWith(rootPath)
        ? response.notFound()
        : new Promise((resolve) => {
            fs.readFile(fontPath, (error, data) => {
              if (error) {
                resolve(response.notFound());
              } else {
                resolve(
                  response.ok({
                    body: data,
                  })
                );
              }
            });
          });
    }
  );
}
