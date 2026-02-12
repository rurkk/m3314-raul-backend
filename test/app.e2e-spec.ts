import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { join } from 'node:path';
import { AppModule } from './../src/app.module';

const hbs = require('hbs');

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const nestApp = moduleFixture.createNestApplication<NestExpressApplication>();
    const viewsPath = join(process.cwd(), 'views');

    nestApp.useStaticAssets(join(process.cwd(), 'public'));
    nestApp.setBaseViewsDir(viewsPath);
    nestApp.setViewEngine('hbs');
    hbs.registerPartials(join(viewsPath, 'partials'), {
      rename: (name: string) => name,
    });

    await nestApp.init();
    app = nestApp;
  });

  it('/ (GET) should render guest session state', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.text).toContain('Вы не авторизованы');
      });
  });

  it('/about?auth=1&user=Raul (GET) should render authenticated session state', () => {
    return request(app.getHttpServer())
      .get('/about?auth=1&user=Raul')
      .expect(200)
      .expect((res) => {
        expect(res.text).toContain('Вы вошли как');
        expect(res.text).toContain('Raul');
      });
  });
});
