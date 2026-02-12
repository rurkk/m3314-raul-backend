
import { Controller, Get, Query, Render } from '@nestjs/common';

type SessionQuery = {
  auth?: string;
  user?: string;
};

type MenuItem = {
  href: string;
  label: string;
};

type ProjectCard = {
  title: string;
  description: string;
  code?: string;
  image?: string;
};

type TableRow = {
  name: string;
  age: number;
  city: string;
};

@Controller()
export class AppController {
  private readonly baseMenuItems: MenuItem[] = [
    { href: '/', label: 'Главная' },
    { href: '/about', label: 'О себе' },
    { href: '/skills', label: 'Навыки' },
    { href: '/portfolio', label: 'Портфолио' },
    { href: '/grid', label: 'Грид' },
    { href: '/constructor', label: 'Конструктор' },
    { href: '/fetch', label: 'Запрос' },
  ];

  private readonly projects: ProjectCard[] = [
    {
      title: 'Проект 1',
      description: 'Программистерская программа.',
      code: 'console.log("Hello, World!");',
    },
    {
      title: 'Проект 2',
      description: 'Сайт портфолио.',
      image: '/img/project2.jpg',
    },
  ];

  private readonly tableRows: TableRow[] = [
    { name: 'Рауль', age: 25, city: 'Питер' },
    { name: 'Алексей', age: 30, city: 'Москва' },
    { name: 'Мария', age: 28, city: 'Екатеринбург' },
  ];

  private readonly skills = {
    frontend: ['HTML', 'CSS', 'JavaScript'],
    backend: ['C#', 'Java'],
  };

  @Get()
  @Render('index')
  getIndexPage(@Query() query: SessionQuery) {
    return {
      ...this.buildPageModel('/', 'Резюме - Портфолио', 'Рауль Муллаянов', query),
      projects: this.projects,
      tableRows: this.tableRows,
      skills: this.skills,
    };
  }

  @Get('about')
  @Render('about')
  getAboutPage(@Query() query: SessionQuery) {
    return this.buildPageModel(
      '/about',
      'О себе - Портфолио',
      'Рауль Муллаянов',
      query,
    );
  }

  @Get('skills')
  @Render('skills')
  getSkillsPage(@Query() query: SessionQuery) {
    return {
      ...this.buildPageModel(
        '/skills',
        'Навыки - Портфолио',
        'Рауль Муллаянов',
        query,
      ),
      skills: this.skills,
    };
  }

  @Get('portfolio')
  @Render('portfolio')
  getPortfolioPage(@Query() query: SessionQuery) {
    return {
      ...this.buildPageModel(
        '/portfolio',
        'Портфолио - Портфолио',
        'Рауль Муллаянов',
        query,
      ),
      projects: this.projects,
    };
  }

  @Get('grid')
  @Render('grid')
  getGridPage(@Query() query: SessionQuery) {
    return {
      ...this.buildPageModel('/grid', 'Грид - Портфолио', 'Рауль Муллаянов', query),
      tableRows: this.tableRows,
    };
  }

  @Get('constructor')
  @Render('constructor')
  getConstructorPage(@Query() query: SessionQuery) {
    return this.buildPageModel(
      '/constructor',
      'Конструктор таблиц',
      'Конструктор таблиц',
      query,
    );
  }

  @Get('fetch')
  @Render('fetch')
  getFetchPage(@Query() query: SessionQuery) {
    return this.buildPageModel('/fetch', 'Mock запрос', 'Mock запрос', query);
  }

  @Get('register')
  @Render('register')
  getRegisterPage(@Query() query: SessionQuery) {
    return this.buildPageModel('/register', 'Регистрация', 'Регистрация', query);
  }

  private buildPageModel(
    currentPath: string,
    pageTitle: string,
    headerTitle: string,
    query: SessionQuery,
  ) {
    const isAuthenticated = query.auth === '1' || query.auth === 'true';
    const userName = (query.user ?? 'Raul').trim() || 'Raul';
    const authSuffix = isAuthenticated
      ? `?auth=1&user=${encodeURIComponent(userName)}`
      : '';

    return {
      pageTitle,
      headerTitle,
      currentYear: new Date().getFullYear(),
      menuItems: this.baseMenuItems.map((item) => ({
        ...item,
        href: `${item.href}${authSuffix}`,
      })),
      session: {
        isAuthenticated,
        userName,
        defaultUserName: userName,
        loginAction: currentPath,
        loginUrl: `${currentPath}?auth=1&user=Raul`,
        logoutUrl: currentPath,
        registerUrl: '/register',
      },
    };
  }

}
