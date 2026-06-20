import type { PublicProfileResponse } from '../types';

// Вспомогательная функция — создаёт автора из username и initials
function author(id: string, username: string, initials: string) {
  return { id, username, avatarInitials: initials };
}

export const MOCK_PUBLIC_PROFILES: Record<string, PublicProfileResponse> = {
  Pavel_dev: {
    profile: {
      username: 'Pavel_dev',
      displayName: 'Павел Разработчик',
      bio: 'Фулстек-разработчик, делаю инструменты для фрилансеров.',
      avatarInitials: 'PD',
      avatarColor: '#3C241C',
      role: 'owner',
      createdAt: '2025-01-10T00:00:00Z',
    },
    projects: [
      {
        id: '1',
        title: 'TaskFlow — менеджер задач для фрилансеров',
        description:
          'Простой и быстрый инструмент для управления задачами и проектами. Без лишнего — только то, что нужно фрилансеру для работы с несколькими клиентами одновременно.',
        category: 'Веб-сервис',
        tags: ['продуктивность', 'фриланс', 'задачи'],
        testingSlots: 8,
        createdAt: '2026-06-10T10:00:00Z',
        author: author('u1', 'Pavel_dev', 'PD'),
        likesCount: 24,
        isLiked: false,
        comments: [
          {
            id: 'c1',
            author: author('u2', 'Maria_qa', 'MQ'),
            text: 'Отличная идея!',
            createdAt: '2026-06-11T09:15:00Z',
          },
        ],
      },
    ],
    stats: { totalApplications: 0, acceptedApplications: 0 },
  },

  green_anna: {
    profile: {
      username: 'green_anna',
      displayName: 'Анна Зелёнова',
      bio: 'Разрабатываю экологичные приложения. Верю, что технологии помогут сохранить планету.',
      avatarInitials: 'GA',
      avatarColor: '#4A7C59',
      role: 'owner',
      createdAt: '2025-02-14T00:00:00Z',
    },
    projects: [
      {
        id: '2',
        title: 'EcoTrack — трекер углеродного следа',
        description:
          'Мобильное приложение для отслеживания личного углеродного следа: транспорт, еда, покупки. Геймификация мотивирует к осознанному потреблению.',
        category: 'Мобильное приложение',
        tags: ['экология', 'геймификация', 'iOS'],
        testingSlots: 15,
        createdAt: '2026-06-12T14:30:00Z',
        author: author('u3', 'green_anna', 'GA'),
        likesCount: 41,
        isLiked: true,
        comments: [
          {
            id: 'c2',
            author: author('u4', 'eco_tester', 'ET'),
            text: 'Интересная концепция. Хочу попробовать!',
            createdAt: '2026-06-12T16:00:00Z',
          },
          {
            id: 'c3',
            author: author('u5', 'mobile_dev', 'MD'),
            text: 'Геймификация — это то, что отличит вас от конкурентов.',
            createdAt: '2026-06-13T08:45:00Z',
          },
        ],
      },
    ],
    stats: { totalApplications: 0, acceptedApplications: 0 },
  },

  lang_master: {
    profile: {
      username: 'lang_master',
      displayName: 'Лингвист Мастер',
      bio: 'Полиглот и разработчик. Создаю инструменты для изучения языков.',
      avatarInitials: 'LM',
      avatarColor: '#6B4F9E',
      role: 'owner',
      createdAt: '2025-03-01T00:00:00Z',
    },
    projects: [
      {
        id: '3',
        title: 'Lexify — расширение для изучения слов',
        description:
          'Браузерное расширение для изучения иностранных слов прямо во время чтения статей. Выделяете слово — получаете перевод и добавляете в свою колоду.',
        category: 'Браузерное расширение',
        tags: ['образование', 'языки', 'Chrome'],
        testingSlots: 5,
        createdAt: '2026-06-13T11:00:00Z',
        author: author('u6', 'lang_master', 'LM'),
        likesCount: 17,
        isLiked: false,
        comments: [],
      },
    ],
    stats: { totalApplications: 0, acceptedApplications: 0 },
  },

  design_kate: {
    profile: {
      username: 'design_kate',
      displayName: 'Катерина Дизайнер',
      bio: 'UX/UI дизайнер с 6-летним опытом. Применяю ИИ в творческом процессе.',
      avatarInitials: 'DK',
      avatarColor: '#C75B7A',
      role: 'owner',
      createdAt: '2025-01-25T00:00:00Z',
    },
    projects: [
      {
        id: '4',
        title: 'MoodBoard AI — генератор мудбордов',
        description:
          'Сервис для дизайнеров: опишите идею — ИИ собирает мудборд из подходящих изображений, шрифтов и цветовых палитр.',
        category: 'Веб-сервис',
        tags: ['дизайн', 'AI', 'инструменты'],
        testingSlots: 20,
        createdAt: '2026-06-14T09:00:00Z',
        author: author('u7', 'design_kate', 'DK'),
        likesCount: 63,
        isLiked: false,
        comments: [
          {
            id: 'c4',
            author: author('u8', 'ux_pro', 'UP'),
            text: 'Это именно то, чего не хватало в нашем рабочем процессе.',
            createdAt: '2026-06-14T12:30:00Z',
          },
        ],
      },
    ],
    stats: { totalApplications: 0, acceptedApplications: 0 },
  },

  fin_startup: {
    profile: {
      username: 'fin_startup',
      displayName: 'ФинСтартап',
      bio: 'Строим финтех-продукты для упрощения повседневных финансовых задач.',
      avatarInitials: 'FS',
      avatarColor: '#2E7D8C',
      role: 'owner',
      createdAt: '2025-04-10T00:00:00Z',
    },
    projects: [
      {
        id: '5',
        title: 'SplitPay — умный дележ счётов',
        description:
          'Сфотографируйте чек — приложение распознаёт позиции и распределяет, кто сколько должен заплатить. Для компаний и пар.',
        category: 'Мобильное приложение',
        tags: ['финансы', 'OCR', 'Android'],
        testingSlots: 12,
        createdAt: '2026-06-15T16:00:00Z',
        author: author('u9', 'fin_startup', 'FS'),
        likesCount: 38,
        isLiked: false,
        comments: [],
      },
    ],
    stats: { totalApplications: 0, acceptedApplications: 0 },
  },

  team_lead_igor: {
    profile: {
      username: 'team_lead_igor',
      displayName: 'Игорь Тимлидов',
      bio: 'Тимлид с 8-летним опытом. Автоматизирую процессы, чтобы команды тратили время на важное.',
      avatarInitials: 'TI',
      avatarColor: '#1A5276',
      role: 'owner',
      createdAt: '2024-11-20T00:00:00Z',
    },
    projects: [
      {
        id: '6',
        title: 'StandUp Bot — автоматизация стендапов',
        description:
          'Телеграм-бот для команд разработки: собирает ежедневные апдейты, формирует сводку и публикует в общий чат. Экономит 15 минут каждое утро.',
        category: 'Телеграм-бот',
        tags: ['Telegram', 'автоматизация', 'команды'],
        testingSlots: 3,
        createdAt: '2026-06-16T08:00:00Z',
        author: author('u10', 'team_lead_igor', 'TI'),
        likesCount: 29,
        isLiked: true,
        comments: [
          {
            id: 'c5',
            author: author('u11', 'scrum_master', 'SM'),
            text: 'Уже ждём когда можно будет протестировать!',
            createdAt: '2026-06-16T09:00:00Z',
          },
        ],
      },
    ],
    stats: { totalApplications: 0, acceptedApplications: 0 },
  },

  habit_hacker: {
    profile: {
      username: 'habit_hacker',
      displayName: 'Хабит Хакер',
      bio: 'Изучаю поведенческую психологию и создаю приложения для выработки полезных привычек.',
      avatarInitials: 'HH',
      avatarColor: '#7D3C98',
      role: 'owner',
      createdAt: '2025-05-05T00:00:00Z',
    },
    projects: [
      {
        id: '7',
        title: 'HabitLoop — трекер привычек с ИИ-коучем',
        description:
          'Формируйте привычки с умными напоминаниями и персональным ИИ-коучем. Анализирует прогресс и корректирует нагрузку, чтобы вы не перегорели.',
        category: 'Мобильное приложение',
        tags: ['привычки', 'AI', 'мотивация'],
        testingSlots: 10,
        createdAt: '2026-06-17T07:00:00Z',
        author: author('u12', 'habit_hacker', 'HH'),
        likesCount: 55,
        isLiked: false,
        comments: [],
      },
    ],
    stats: { totalApplications: 0, acceptedApplications: 0 },
  },

  foodie_dev: {
    profile: {
      username: 'foodie_dev',
      displayName: 'Фуди Девелопер',
      bio: 'Соединяю страсть к еде и технологиям. Создаю платформы для гастрономических сообществ.',
      avatarInitials: 'FD',
      avatarColor: '#C0392B',
      role: 'owner',
      createdAt: '2025-03-22T00:00:00Z',
    },
    projects: [
      {
        id: '8',
        title: 'LocalFood — маркетплейс домашней еды',
        description:
          'Платформа, где домашние повара продают готовую еду соседям. Никаких ресторанов — только живые люди и настоящие рецепты из разных культур.',
        category: 'Маркетплейс',
        tags: ['еда', 'сообщество', 'маркетплейс'],
        testingSlots: 25,
        createdAt: '2026-06-17T12:00:00Z',
        author: author('u13', 'foodie_dev', 'FD'),
        likesCount: 88,
        isLiked: false,
        comments: [
          {
            id: 'c6',
            author: author('u14', 'food_lover', 'FL'),
            text: 'Давно мечтал о чём-то подобном в нашем районе!',
            createdAt: '2026-06-17T14:00:00Z',
          },
        ],
      },
    ],
    stats: { totalApplications: 0, acceptedApplications: 0 },
  },

  devtools_pro: {
    profile: {
      username: 'devtools_pro',
      displayName: 'DevTools Pro',
      bio: 'Разрабатываю инструменты для разработчиков. Фанат автоматизации code review.',
      avatarInitials: 'DP',
      avatarColor: '#1E8449',
      role: 'owner',
      createdAt: '2024-12-01T00:00:00Z',
    },
    projects: [
      {
        id: '9',
        title: 'CodeReview AI — автоматический ревью кода',
        description:
          'Подключите к GitHub — ИИ оставляет комментарии к PR как опытный сеньор: находит баги, предлагает рефакторинг, проверяет безопасность.',
        category: 'Инструмент разработчика',
        tags: ['GitHub', 'AI', 'code review'],
        testingSlots: 7,
        createdAt: '2026-06-18T09:00:00Z',
        author: author('u15', 'devtools_pro', 'DP'),
        likesCount: 102,
        isLiked: false,
        comments: [
          {
            id: 'c7',
            author: author('u16', 'senior_dev', 'SD'),
            text: 'Это убьёт половину задач нашего ревью-процесса. Записываюсь!',
            createdAt: '2026-06-18T11:00:00Z',
          },
        ],
      },
    ],
    stats: { totalApplications: 0, acceptedApplications: 0 },
  },

  wellness_app: {
    profile: {
      username: 'wellness_app',
      displayName: 'WellnessApp',
      bio: 'Создаю приложения для здоровья и продуктивности. Верю в баланс работы и отдыха.',
      avatarInitials: 'WA',
      avatarColor: '#117A65',
      role: 'owner',
      createdAt: '2025-02-28T00:00:00Z',
    },
    projects: [
      {
        id: '10',
        title: 'WellDesk — эргономика рабочего места',
        description:
          'Приложение следит за временем за компьютером, напоминает о перерывах и упражнениях. Интегрируется с календарём — не отвлекает в важные встречи.',
        category: 'Десктоп-приложение',
        tags: ['здоровье', 'продуктивность', 'macOS'],
        testingSlots: 18,
        createdAt: '2026-06-18T14:00:00Z',
        author: author('u17', 'wellness_app', 'WA'),
        likesCount: 33,
        isLiked: false,
        comments: [],
      },
    ],
    stats: { totalApplications: 0, acceptedApplications: 0 },
  },

  startup_wizard: {
    profile: {
      username: 'startup_wizard',
      displayName: 'Стартап Визард',
      bio: 'Серийный предприниматель. Помогаю стартапам быстрее находить инвесторов.',
      avatarInitials: 'SW',
      avatarColor: '#B7950B',
      role: 'owner',
      createdAt: '2025-06-01T00:00:00Z',
    },
    projects: [
      {
        id: '11',
        title: 'PitchDeck AI — презентации за 5 минут',
        description:
          'Опишите свою идею в нескольких предложениях — сервис генерирует структуру питч-дека, слайды и тезисы для инвесторов.',
        category: 'Веб-сервис',
        tags: ['стартап', 'AI', 'презентации'],
        testingSlots: 6,
        createdAt: '2026-06-19T10:00:00Z',
        author: author('u18', 'startup_wizard', 'SW'),
        likesCount: 76,
        isLiked: false,
        comments: [
          {
            id: 'c8',
            author: author('u19', 'investor_lens', 'IL'),
            text: 'Как раз готовлюсь к Demo Day — попробую!',
            createdAt: '2026-06-19T12:00:00Z',
          },
        ],
      },
    ],
    stats: { totalApplications: 0, acceptedApplications: 0 },
  },

  community_builder: {
    profile: {
      username: 'community_builder',
      displayName: 'Комьюнити Билдер',
      bio: 'Строю гиперлокальные сообщества. Убеждён, что соседи — лучший ресурс.',
      avatarInitials: 'CB',
      avatarColor: '#884EA0',
      role: 'owner',
      createdAt: '2025-04-18T00:00:00Z',
    },
    projects: [
      {
        id: '12',
        title: 'NearHelp — соседская взаимопомощь',
        description:
          'Гиперлокальная сеть: попросите соседей помочь с мелкими задачами или предложите свои услуги. Выгулять собаку, принять посылку, починить кран.',
        category: 'Мобильное приложение',
        tags: ['сообщество', 'соседи', 'помощь'],
        testingSlots: 30,
        createdAt: '2026-06-19T16:00:00Z',
        author: author('u20', 'community_builder', 'CB'),
        likesCount: 47,
        isLiked: false,
        comments: [],
      },
    ],
    stats: { totalApplications: 0, acceptedApplications: 0 },
  },

  test_user_42: {
    profile: {
      username: 'test_user_42',
      displayName: 'Алексей Тестировщиков',
      bio: 'Тестирую продукты с 2022 года. Интересуют мобильные приложения и SaaS.',
      avatarInitials: 'АТ',
      avatarColor: '#3C241C',
      role: 'qa',
      createdAt: '2024-03-15T10:00:00Z',
    },
    projects: [],
    stats: { totalApplications: 4, acceptedApplications: 1 },
  },
};
