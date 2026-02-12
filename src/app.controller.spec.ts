import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(() => {
    appController = new AppController();
  });

  describe('getIndexPage', () => {
    it('should return guest session view model by default', () => {
      const model = appController.getIndexPage({});

      expect(model.session.isAuthenticated).toBe(false);
      expect(model.session.loginUrl).toBe('/?auth=1&user=Raul');
      expect(model.projects).toHaveLength(2);
    });

    it('should return authenticated session view model', () => {
      const model = appController.getIndexPage({ auth: '1', user: 'Raul' });

      expect(model.session.isAuthenticated).toBe(true);
      expect(model.session.userName).toBe('Raul');
      expect(model.menuItems[1].href).toContain('auth=1');
    });
  });
});
