
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'node:path';
const hbs = require('hbs');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const viewsPath = join(process.cwd(), 'views');
  const partialsPath = join(viewsPath, 'partials');

  app.useStaticAssets(join(process.cwd(), 'public'));
  app.setBaseViewsDir(viewsPath);
  app.setViewEngine('hbs');

  await new Promise<void>((resolve, reject) => {
    hbs.registerPartials(
      partialsPath,
      { rename: (name: string) => name },
      (err: Error | null) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      },
    );
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
