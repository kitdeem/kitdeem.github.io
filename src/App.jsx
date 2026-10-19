import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

const nodes = [
  { id: 'owl', ru: 'Онтологии', en: 'Ontologies', x: 15, y: 18 },
  { id: 'kg', ru: 'Графы знаний', en: 'Knowledge graphs', x: 40, y: 12 },
  { id: 'mbse', ru: 'MBSE', en: 'MBSE', x: 63, y: 20 },
  { id: 'product', ru: 'Product Manager', en: 'Product Manager', x: 86, y: 14 },
  { id: 'py', ru: 'Python', en: 'Python', x: 22, y: 46 },
  { id: 'ts', ru: 'TypeScript', en: 'TypeScript', x: 48, y: 42 },
  { id: 'ui', ru: 'React и Vue', en: 'React and Vue', x: 74, y: 48 },
  { id: 'design', ru: 'Дизайн сайтов', en: 'Site design', x: 58, y: 58 },
  { id: 'cms', ru: 'Strapi и Twenty', en: 'Strapi and Twenty', x: 18, y: 90 },
  { id: 'api', ru: 'FastAPI', en: 'FastAPI', x: 12, y: 74 },
  { id: 'node', ru: 'Node.js', en: 'Node.js', x: 36, y: 80 },
  { id: 'pg', ru: 'PostgreSQL', en: 'PostgreSQL', x: 58, y: 72 },
  { id: 'docker', ru: 'Docker', en: 'Docker', x: 80, y: 78 },
  { id: 'ci', ru: 'GitLab CI', en: 'GitLab CI', x: 90, y: 56 },
  { id: 'nn', ru: 'Нейросети', en: 'Neural models', x: 80, y: 34 },
]

const threads = [
  ['owl', 'kg'],
  ['owl', 'mbse'],
  ['kg', 'mbse'],
  ['mbse', 'product'],
  ['kg', 'product'],
  ['owl', 'py'],
  ['kg', 'py'],
  ['mbse', 'py'],
  ['py', 'api'],
  ['py', 'pg'],
  ['ts', 'ui'],
  ['ts', 'node'],
  ['ui', 'node'],
  ['design', 'ui'],
  ['design', 'product'],
  ['cms', 'node'],
  ['cms', 'ui'],
  ['cms', 'pg'],
  ['node', 'pg'],
  ['api', 'pg'],
  ['node', 'docker'],
  ['api', 'docker'],
  ['pg', 'docker'],
  ['docker', 'ci'],
  ['ui', 'product'],
  ['nn', 'owl'],
  ['nn', 'kg'],
  ['nn', 'py'],
  ['nn', 'product'],
]

const copy = {
  ru: {
    write: 'Написать',
    mail: 'Почта',
    langLabel: 'Язык',
    ghost: 'ГРАФ',
    eyebrow: 'Systems Architect',
    eyebrowSub: 'Knowledge Graphs · MBSE',
    name: ['Дмитрий', 'Волокитин'],
    lede: 'Семь лет занимаюсь онтологическими платформами: от модели предметной области и архитектуры сервисов до продукта, который можно продать предприятию.',
    cta: 'Смотреть проекты',
    alt: 'Дмитрий Волокитин',
    factsLabel: 'Коротко',
    facts: [
      ['Сейчас', 'Директор по развитию'],
      ['Компания', 'Time & Space'],
      ['Город', 'Москва'],
      ['Формат', 'Релокация и удалёнка'],
    ],
    aboutKicker: 'О себе',
    aboutTitle: 'Чем занимаюсь',
    aboutLead: 'Системный архитектор с фокусом на графах знаний, модельно-ориентированной системной инженерии и семантических технологиях. Занимаюсь онтологической платформой от концепции до коммерческого продукта. Дизайн сайтов тоже разрабатываю.',
    aboutPoints: [
      'Сейчас: дорожная карта OSA, вывод на рынок, кейсы для инфраструктуры и энергетики. Параллельно технический директор Ecoport / Rusecolog.',
      'До этого: ядро онтологии, архитектура сервисов, дизайн сайтов компании, преподавание MBSE и онтологического моделирования.',
      'Обучил больше 100 человек, среди них студенты старших курсов ведущих вузов РФ.',
      'Нейросети использую на высоком уровне и подключаю их к контуру компании: онтология, API, политики, проверка ответа.',
    ],
    workKicker: 'Работа',
    workTitle: 'Опыт',
    workLead: 'Нажмите плитку, чтобы раскрыть, что именно делал в этой роли.',
    roles: [
      {
        id: 'director',
        index: '01',
        kicker: 'с ноября 2025',
        title: 'Директор по развитию',
        span: 'Time & Space',
        summary: 'Вывод OSA из внутреннего R&D в коммерческий B2B-продукт.',
        points: [
          'Участвую в переводе внутренней R&D-платформы OSA в коммерческий продукт: стратегия выхода, профиль клиента, карты пути заказчика.',
          'Корпоративная подача платформы и технические кейсы для enterprise-продаж.',
          'Дорожная карта онтологических активов для инфраструктуры и энергетики.',
        ],
      },
      {
        id: 'ecoport',
        index: '02',
        kicker: 'сейчас',
        title: 'Технический директор',
        span: 'Ecoport / Rusecolog',
        summary: 'Сайты с нуля, хостинг, позиционирование, CMS и CRM.',
        points: [
          'Поднял сайты направления с нуля: структура, дизайн, сборка и вывод на хостинг.',
          'Вёл позиционирование витрины и тексты, по которым сайт объясняется клиенту.',
          'Связал сайт с CMS на Strapi и с CRM на Twenty. Обе системы поднял и поддерживаю.',
        ],
      },
      {
        id: 'engineer',
        index: '03',
        kicker: 'июнь 2022 - ноябрь 2025',
        title: 'Системный и knowledge-инженер',
        span: 'Time & Space',
        summary: 'Онтология OSA, Атлас, преподавание MBSE, сайт и CI/CD.',
        points: [
          'Системный и knowledge-инженер OSA: ядро онтологии и сервисная архитектура для интеграции данных крупных заказчиков.',
          'Занимался MVP графа знаний «Атлас образования» для методологов.',
          'Преподаю MBSE и онтологическое моделирование разным организациям. Обучил больше 100 человек, в том числе студентов старших курсов ведущих вузов РФ.',
          'Занимался корпоративным сайтом tas-project.ru на React, Strapi и Node.js. Дизайн сайта тоже мой. Strapi поднял и поддерживал.',
          'Поднял CI/CD на GitLab CI и приватных раннерах.',
        ],
      },
    ],
    projectsKicker: 'Проекты',
    projectsTitle: 'Основные и актуальные проекты',
    projectsLead: 'В плитке короткая суть. Внутри контур, стек и задача.',
    projects: [
      {
        id: 'osa',
        index: '01',
        kicker: 'с 2022',
        title: 'OSA',
        summary: 'Онтологическая платформа автоматизации. Реестр российского ПО №7147.',
        body: [
          'Предприятие описывает предметную область единой моделью. Занимаюсь семантической структурой данных, интеграцией графа знаний и архитектурой поставки.',
          'Монорепозиторий сервисов: Node.js и Express, PostgreSQL, Vue, фоновые воркеры, Docker. Метамодель хранится отдельно от экземпляров, нотацию можно менять в модели.',
        ],
        chips: ['RDF / OWL', 'граф знаний', 'Node.js', 'Vue', 'PostgreSQL', 'Docker'],
      },
      {
        id: 'atlas',
        index: '02',
        kicker: 'MVP',
        title: 'Атлас образования',
        summary: 'Граф курса и понятий для методолога.',
        body: [
          'Из учебного текста собирается карта: понятия, фрагменты, связи термин-термин. Методолог правит граф, видит покрытие и получает рекомендации, где в курсе не хватает материала. Курс выгружается в Markdown и HTML.',
          'Правки методолога лежат отдельным слоем поверх сырого выхода модели.',
        ],
        chips: ['Vue 3', 'TypeScript', 'FastAPI', 'Cytoscape.js', 'Pinia'],
      },
      {
        id: 'msu',
        index: '03',
        kicker: '2025-2026',
        title: 'Образовательные продукты с вузами',
        summary: 'Совместные программы MBSE, программной и онтологической инженерии на OSA.',
        body: [
          'Вместе с ведущими вузами РФ подготовили программы цифровых навыков по модельно-ориентированной системной, программной и онтологической инженерии.',
          'Три продукта на OSA: методические основы MBSE, методические основы программной инженерии по SWEBOK V4, менеджмент риска кибербезопасности. В учебном году 2025/2026 вёл занятия у студентов старших курсов.',
          'Публикация: https://tas-project.ru/publications/tas-msu',
        ],
        chips: ['MBSE', 'OSA', 'онтологии', 'вузы РФ'],
      },
      {
        id: 'claims',
        index: '04',
        kicker: 'R&D',
        title: 'Live Claim Validator',
        summary: 'Проверка сказанного по ходу разговора.',
        body: [
          'Живая речь режется на высказывания, из них достаются проверяемые утверждения. Фактические сверяются с источниками и возвращаются с цитатами. Выводные проверяются структурно, через spaCy и NLI.',
          'Сессия показывает флаги и журнал событий пайплайна.',
        ],
        chips: ['Next.js', 'Python', 'FastAPI', 'spaCy', 'NLI'],
      },
      {
        id: 'sem',
        index: '05',
        kicker: 'свой контур',
        title: 'sem-tools',
        summary: 'Контур управления семантикой и автоматизацией.',
        body: [
          'Control plane над Semantica и self-hosted n8n. Онтология, граф контекста, политики и решения, которые можно проследить. Шаги автоматизации пишут проверки политик обратно в граф.',
          'CLI, API и веб-интерфейс со схемой графа и причинной цепочкой.',
        ],
        chips: ['Python', 'FastAPI', 'React', 'n8n', 'Docker'],
      },
      {
        id: 'site',
        index: '06',
        kicker: '2022-2025',
        title: 'Сайт и контур поставки',
        summary: 'tas-project.ru и GitLab CI.',
        body: [
          'Корпоративный сайт на React, Strapi и Node.js. Контент ведётся в Strapi, который я поднял и поддерживал. Дизайн этого сайта и остальных разрабатывал я: композиция, типографика, сетка.',
          'CI/CD на GitLab CI с приватными раннерами. Сборка и выкладка одинаковые у разработчиков и на серверах.',
        ],
        chips: ['React', 'Strapi', 'Node.js', 'GitLab CI', 'Docker'],
      },
      {
        id: 'eco',
        index: '07',
        kicker: 'Ecoport / Rusecolog',
        title: 'Сайты направления',
        summary: 'Витрина с нуля, хостинг, Strapi и Twenty.',
        body: [
          'Сайты Ecoport / Rusecolog собраны с нуля: структура, позиционирование, дизайн и хостинг. Каталог добавок и сочетаний сделан на Next.js, Strapi 5, PostgreSQL и Docker.',
          'Контент живёт в Strapi, клиентская работа в Twenty. Обе системы поднял и поддерживаю, сайт связан с CMS и с CRM.',
          'Отдельно собрал коммерческое предложение back-office для производителя добавок. Продуктовая система рассчитана на несколько лет.',
        ],
        chips: ['Next.js', 'Strapi 5', 'Twenty', 'PostgreSQL', 'Docker'],
      },
    ],
    casesKicker: 'Внедрения',
    casesTitle: 'Внедрения',
    casesLead: 'Цифры из рабочих кейсов для поставок и продаж.',
    cases: [
      {
        id: 'rosatom',
        index: '01',
        kicker: 'Инфраструктура',
        title: 'ИТ-архитектура атомного холдинга',
        summary: 'Многослойная модель ландшафта на OSA для крупнейшего атомного холдинга. Поиск быстрее до 40%.',
        body: 'На OSA автоматизирован процесс управления ИТ-архитектурой и интеграцией для отраслевого ландшафта крупнейшего атомного холдинга. Модель идёт от бизнес-процессов до физической инфраструктуры: метамодель нотации, экземпляры, согласование целевой архитектуры, хранилище документации, справочники и аутентификация.',
        points: [
          'Поиск по ландшафту быстрее до 40%.',
          'Затраты на моделирование и на создание компонент за счёт переиспользования ниже до 10%.',
          'Единый источник по компонентам архитектуры. Решение сертифицировано ФСТЭК и работает в контурах с повышенными требованиями к безопасности.',
        ],
      },
      {
        id: 'spd',
        index: '02',
        kicker: 'Пространственные данные',
        title: 'База знаний СПД',
        summary: 'Глоссарий оператора пространственных данных: около 2640 документов.',
        body: 'Методология и глоссарий для оператора национальной системы пространственных данных. Документы, модели, сервисы и классификаторы опираются на один понятийный аппарат. В базе порядка 2640 документов, из них в 2025 году создано около 450 и актуализировано около 200.',
        points: [
          'Актуализация терминов под новые редакции НПА и стандартов, разделы по ГИС, метаданным, сервисам и онтологиям.',
          'Связи термина с документами, процессами, классификаторами и моделями данных.',
          'Основа онтологического ядра: термин связан с сущностью цифрового продукта.',
        ],
      },
      {
        id: 'energy',
        index: '03',
        kicker: 'Энергетика',
        title: 'Сети и подготовка инженеров',
        summary: 'MBSE для 60+ инженеров и модель распределительных сетей.',
        body: 'Программа MBSE, которую я спроектировал и провёл, для 60+ инженеров. Рядом отраслевой трек по моделированию распределительных сетей вместе с отраслевым университетом и производителем электрооборудования: два набора, больше 400 заявок, около 150 выпускников. Компетенции передавались в вуз и в орган государственной экспертизы.',
        points: [
          'Трек от курса по цифровому моделированию сетей до отраслевой практики.',
          'НИОКР для крупной гидрогенерирующей компании: прототип онтологической модели распределительных сетей и объектов локальной энергетики, со стыковкой к ТОиР, СК-11, ГИС и телеметрии.',
        ],
      },
    ],
    skillsKicker: 'Навыки',
    skillsTitle: 'Мои умения',
    skills: [
      {
        id: 'ke',
        index: '01',
        title: 'Knowledge Engineer',
        summary: 'Онтологии RDF/OWL, графы знаний, MBSE.',
        body: 'Онтологии RDF/OWL, графы знаний, Semantic Web, MBSE, метамодели нотаций, глоссарии и правила согласованности терминов.',
      },
      {
        id: 'lang',
        index: '02',
        title: 'Языки программирования',
        summary: 'TypeScript, Python, JavaScript, SQL.',
        body: 'TypeScript и JavaScript на фронтенде и в Node.js. Python: FastAPI, пайплайны и NLP. SQL: PostgreSQL как основное хранилище.',
      },
      {
        id: 'speak',
        index: '03',
        title: 'Владение языками',
        summary: 'Русский и английский.',
        body: 'Русский родной. Английский рабочий: переписка, документы и материалы на английском.',
      },
      {
        id: 'api',
        index: '04',
        title: 'Backend-разработчик',
        summary: 'Node.js, FastAPI, Strapi, Twenty.',
        body: 'Node.js, Express, FastAPI, REST, PostgreSQL. Strapi и Twenty поднимал с нуля в разных проектах и поддерживаю: схема, роли, хостинг, связь сайта с CRM.',
      },
      {
        id: 'ui',
        index: '05',
        title: 'Frontend-разработчик',
        summary: 'React, Next.js, Vue 3.',
        body: 'React, Next.js, Vue 3. Редакторы графов, сессионные интерфейсы, контентные платформы. Визуальный дизайн сайтов тоже разрабатываю.',
      },
      {
        id: 'ops',
        index: '06',
        title: 'DevOps',
        summary: 'Docker, GitLab CI, VPS.',
        body: 'Docker, GitLab CI/CD, приватные раннеры, VPS. Одна среда у разработчика и на сервере.',
      },
      {
        id: 'product',
        index: '07',
        title: 'Product Manager',
        summary: 'Дорожная карта, профиль клиента, кейсы для продаж.',
        body: 'Вывод R&D в B2B: профиль клиента, путь заказчика, дорожная карта, технические кейсы для продаж.',
      },
      {
        id: 'nn',
        index: '08',
        title: 'Интеграция нейросетей',
        summary: 'Модели, контекст, API и политики компании.',
        body: 'Высокий уровень работы с нейросетями разных семейств: постановка задачи, сборка контекста, цепочка из нескольких моделей, проверка ответа. Подключаю их к компании через онтологию и граф знаний, API, политики и рабочие процессы. Модель читает сущности и допустимые действия предприятия и возвращает результат в тот же контур.',
      },
    ],
    eduKicker: 'Образование',
    eduTitle: 'МИСИС',
    eduDegree: 'Бакалавр, материаловедение и технологии материалов',
    eduPlace: 'Национальный исследовательский технологический университет, Москва, 2017-2021',
    eduLang: 'Русский родной. Английский рабочий.',
    webKicker: 'Связи',
    webTitle: 'Связи между умениями',
    webLead: 'Нить соединяет навыки, которые работают в одной задаче. Наведите на узел, чтобы увидеть его связи.',
    closeTitle: 'Связаться со мной',
    closeLead: 'Москва. Открыт к релокации и удалённой работе.',
    title: 'Дмитрий Волокитин, системный архитектор',
  },
  en: {
    write: 'Contact',
    mail: 'Email',
    langLabel: 'Language',
    ghost: 'GRAPH',
    eyebrow: 'Systems Architect',
    eyebrowSub: 'Knowledge Graphs · MBSE',
    name: ['Dmitrii', 'Volokitin'],
    lede: 'For seven years I have been working on ontology platforms, from a domain model and service architecture to a product a company can buy.',
    cta: 'See the projects',
    alt: 'Dmitrii Volokitin',
    factsLabel: 'In short',
    facts: [
      ['Now', 'Development Director'],
      ['Company', 'Time & Space'],
      ['City', 'Moscow'],
      ['Format', 'Relocation and remote'],
    ],
    aboutKicker: 'About',
    aboutTitle: 'What I do',
    aboutLead: 'Systems architect focused on knowledge graphs, model-based systems engineering, and semantic technologies. I work on an ontology platform from concept to a commercial product. I also design the sites.',
    aboutPoints: [
      'Now: the OSA roadmap, go-to-market, and cases for infrastructure and energy. In parallel, technical director at Ecoport / Rusecolog.',
      'Before that: the ontology core, service architecture, site design, and teaching MBSE and ontology modeling.',
      'I have taught more than 100 people, including senior students at leading Russian universities.',
      'I use neural models at a high level and connect them to a company loop: ontology, APIs, policies, and a check of the answer.',
    ],
    workKicker: 'Work',
    workTitle: 'Experience',
    workLead: 'Open a tile to see what the role actually included.',
    roles: [
      {
        id: 'director',
        index: '01',
        kicker: 'since November 2025',
        title: 'Development Director',
        span: 'Time & Space',
        summary: 'Turned OSA from an internal R&D asset into a commercial B2B product.',
        points: [
          'I take part in moving the internal OSA platform into a commercial product: go-to-market, client profile, and customer journey maps.',
          'Corporate presentation of the platform and technical cases for enterprise sales.',
          'Roadmap of ontology assets for infrastructure and energy.',
        ],
      },
      {
        id: 'ecoport',
        index: '02',
        kicker: 'now',
        title: 'Technical Director',
        span: 'Ecoport / Rusecolog',
        summary: 'Sites from scratch, hosting, positioning, CMS and CRM.',
        points: [
          'Built the sites of this line from scratch: structure, design, assembly, and hosting.',
          'Set the storefront positioning and the copy that explains the site to a client.',
          'Connected the site to a Strapi CMS and a Twenty CRM. I set both up and I maintain them.',
        ],
      },
      {
        id: 'engineer',
        index: '03',
        kicker: 'June 2022 - November 2025',
        title: 'Systems and knowledge engineer',
        span: 'Time & Space',
        summary: 'OSA ontology, Atlas, MBSE teaching, the company site, and CI/CD.',
        points: [
          'Systems and knowledge engineer on OSA: the ontology core and the service architecture used to integrate data for large clients.',
          'Worked on the Education Atlas knowledge-graph MVP for instructional designers.',
          'I teach MBSE and ontology modeling for different organizations. More than 100 people, including senior students at leading Russian universities.',
          'Worked on the company site tas-project.ru on React, Strapi, and Node.js. I designed it, and I set up and maintained Strapi.',
          'Set up CI/CD on GitLab CI with private runners.',
        ],
      },
    ],
    projectsKicker: 'Projects',
    projectsTitle: 'Main and current projects',
    projectsLead: 'The tile keeps the point. Inside are the stack, the shape, and the job.',
    projects: [
      {
        id: 'osa',
        index: '01',
        kicker: 'since 2022',
        title: 'OSA',
        summary: 'Ontology platform for automation. Listed in the Russian software registry, no. 7147.',
        body: [
          'A company describes its domain as one model. I work on the semantic data structure, knowledge-graph integration, and delivery architecture.',
          'A monorepo of services: Node.js and Express, PostgreSQL, Vue, background workers, Docker. The metamodel is stored apart from the instances, so the notation can change inside the model.',
        ],
        chips: ['RDF / OWL', 'knowledge graph', 'Node.js', 'Vue', 'PostgreSQL', 'Docker'],
      },
      {
        id: 'atlas',
        index: '02',
        kicker: 'MVP',
        title: 'Education Atlas',
        summary: 'A course and concept graph for an instructional designer.',
        body: [
          'A teaching text becomes a map: concepts, fragments, term-to-term links. The designer edits the graph, sees coverage, and gets recommendations where the course is thin. The course exports to Markdown and HTML.',
          'Designer edits sit in a separate layer on top of the raw model output.',
        ],
        chips: ['Vue 3', 'TypeScript', 'FastAPI', 'Cytoscape.js', 'Pinia'],
      },
      {
        id: 'msu',
        index: '03',
        kicker: '2025-2026',
        title: 'Educational products with universities',
        summary: 'Joint programs in MBSE, software engineering, and ontology engineering on OSA.',
        body: [
          'With leading Russian universities we prepared digital-skill programs in model-based systems, software, and ontology engineering.',
          'Three products on OSA: methodological foundations of MBSE, methodological foundations of software engineering from SWEBOK V4, and cybersecurity risk management. In the 2025/2026 academic year I taught senior students.',
          'Publication: https://tas-project.ru/publications/tas-msu',
        ],
        chips: ['MBSE', 'OSA', 'ontologies', 'Russian universities'],
      },
      {
        id: 'claims',
        index: '04',
        kicker: 'R&D',
        title: 'Live Claim Validator',
        summary: 'Checking what is said while the conversation is still going.',
        body: [
          'Live speech is split into utterances, and checkable claims are pulled out of them. Factual claims are checked against sources and returned with citations. Inferential claims are checked structurally, with spaCy and NLI.',
          'The session shows flags and a log of pipeline events.',
        ],
        chips: ['Next.js', 'Python', 'FastAPI', 'spaCy', 'NLI'],
      },
      {
        id: 'sem',
        index: '05',
        kicker: 'own loop',
        title: 'sem-tools',
        summary: 'A control loop for semantics and automation.',
        body: [
          'A control plane over Semantica and self-hosted n8n. Ontology, context graph, policies, and decisions that can be traced. Automation steps write policy checks back into the graph.',
          'CLI, API, and a web UI with the graph and the causal chain.',
        ],
        chips: ['Python', 'FastAPI', 'React', 'n8n', 'Docker'],
      },
      {
        id: 'site',
        index: '06',
        kicker: '2022-2025',
        title: 'Company site and delivery',
        summary: 'tas-project.ru and GitLab CI.',
        body: [
          'The company site on React, Strapi, and Node.js. Content lives in Strapi, which I set up and maintained. I designed this site and the others: layout, type, and grid.',
          'CI/CD on GitLab CI with private runners. The build and the release are the same for developers and for the servers.',
        ],
        chips: ['React', 'Strapi', 'Node.js', 'GitLab CI', 'Docker'],
      },
      {
        id: 'eco',
        index: '07',
        kicker: 'Ecoport / Rusecolog',
        title: 'Sites for the line',
        summary: 'A storefront from scratch, hosting, Strapi, and Twenty.',
        body: [
          'The Ecoport / Rusecolog sites were built from scratch: structure, positioning, design, and hosting. The supplement catalog runs on Next.js, Strapi 5, PostgreSQL, and Docker.',
          'Content lives in Strapi, and client work lives in Twenty. I set both up and I maintain them. The site is connected to the CMS and the CRM.',
          'Separately, a back-office proposal for a supplement maker. The product system is meant to last for several years.',
        ],
        chips: ['Next.js', 'Strapi 5', 'Twenty', 'PostgreSQL', 'Docker'],
      },
    ],
    casesKicker: 'Deployments',
    casesTitle: 'Deployments',
    casesLead: 'Figures from working cases prepared for delivery and sales.',
    cases: [
      {
        id: 'rosatom',
        index: '01',
        kicker: 'Infrastructure',
        title: 'IT architecture of a nuclear holding',
        summary: 'A layered landscape model on OSA for the largest nuclear holding. Search up to 40% faster.',
        body: 'OSA automated IT architecture and integration management for the industry landscape of the largest nuclear holding. The model runs from business processes to physical infrastructure: notation metamodel, instances, approval of the target architecture, document storage, directories, and authentication.',
        points: [
          'Search across the landscape is up to 40% faster.',
          'The cost of modeling and of building components through reuse is up to 10% lower.',
          'One source for architecture components. The solution is certified and runs in environments with raised security requirements.',
        ],
      },
      {
        id: 'spd',
        index: '02',
        kicker: 'Spatial data',
        title: 'Spatial data knowledge base',
        summary: 'A glossary for a spatial-data operator: about 2,640 documents.',
        body: 'Methodology and a glossary for the operator of a national spatial data system. Documents, models, services, and classifiers rest on one vocabulary. The base holds about 2,640 documents. In 2025 about 450 were created and about 200 were updated.',
        points: [
          'Terms updated to new regulations and standards, with sections for GIS, metadata, services, and ontologies.',
          'Links from a term to documents, processes, classifiers, and data models.',
          'The core of the ontology: a term is tied to the entity of a digital product.',
        ],
      },
      {
        id: 'energy',
        index: '03',
        kicker: 'Energy',
        title: 'Networks and engineer training',
        summary: 'MBSE for 60+ engineers and a model of distribution networks.',
        body: 'An MBSE program I designed and taught, for 60+ engineers. Beside it, an industry track on modeling distribution networks, with an industry university and an electrical-equipment maker: two cohorts, more than 400 applications, about 150 graduates. The practice was passed on to a university and to a state expert review body.',
        points: [
          'A track from a course on digital network modeling to industry practice.',
          'R&D for a major hydropower company: a prototype ontology of distribution networks and local energy assets, joined to maintenance, SCADA, GIS, and telemetry.',
        ],
      },
    ],
    skillsKicker: 'Skills',
    skillsTitle: 'My skills',
    skills: [
      {
        id: 'ke',
        index: '01',
        title: 'Knowledge Engineer',
        summary: 'RDF/OWL ontologies, knowledge graphs, MBSE.',
        body: 'RDF/OWL ontologies, knowledge graphs, the Semantic Web, MBSE, notation metamodels, glossaries, and rules that keep terms consistent.',
      },
      {
        id: 'lang',
        index: '02',
        title: 'Programming languages',
        summary: 'TypeScript, Python, JavaScript, SQL.',
        body: 'TypeScript and JavaScript on the frontend and in Node.js. Python: FastAPI, pipelines, and NLP. SQL: PostgreSQL as the main store.',
      },
      {
        id: 'speak',
        index: '03',
        title: 'Languages',
        summary: 'Russian and English.',
        body: 'Russian is native. English is a working language: correspondence, documents, and materials in English.',
      },
      {
        id: 'api',
        index: '04',
        title: 'Backend developer',
        summary: 'Node.js, FastAPI, Strapi, Twenty.',
        body: 'Node.js, Express, FastAPI, REST, PostgreSQL. I have set up Strapi and Twenty from scratch on different projects and I maintain them: schema, roles, hosting, and the link from the site to the CRM.',
      },
      {
        id: 'ui',
        index: '05',
        title: 'Frontend developer',
        summary: 'React, Next.js, Vue 3.',
        body: 'React, Next.js, Vue 3. Graph editors, session interfaces, and content platforms. I also design the visual side of the sites.',
      },
      {
        id: 'ops',
        index: '06',
        title: 'DevOps',
        summary: 'Docker, GitLab CI, VPS.',
        body: 'Docker, GitLab CI/CD, private runners, VPS. One environment for the developer and the server.',
      },
      {
        id: 'product',
        index: '07',
        title: 'Product Manager',
        summary: 'Roadmap, client profile, cases for sales.',
        body: 'Taking R&D into B2B: client profile, customer journey, roadmap, and technical cases for sales.',
      },
      {
        id: 'nn',
        index: '08',
        title: 'AI integration',
        summary: 'Models, context, company APIs and policies.',
        body: 'A high level of work with neural models across families: setting the task, assembling context, a chain of several models, and checking the answer. I connect them to a company through the ontology and knowledge graph, APIs, policies, and workflows. The model reads the enterprise entities and allowed actions and returns the result into the same loop.',
      },
    ],
    eduKicker: 'Education',
    eduTitle: 'MISIS',
    eduDegree: 'B.Sc., Materials Science and Materials Technology',
    eduPlace: 'National University of Science and Technology, Moscow, 2017-2021',
    eduLang: 'Russian, native. English, working.',
    webKicker: 'Links',
    webTitle: 'How the skills connect',
    webLead: 'A thread joins skills that work on the same job. Hover a node to see its links.',
    closeTitle: 'Contact me',
    closeLead: 'Moscow. Open to relocation and remote work.',
    title: 'Dmitrii Volokitin, systems architect',
  },
}

function PopLetter({ delay = 0, children }) {
  const reduce = useReducedMotion()
  if (reduce) return <span>{children}</span>
  return (
    <motion.span
      initial={{ x: '62%', scaleX: 1.7, opacity: 0 }}
      animate={{ x: '0%', scaleX: 1, opacity: 1 }}
      transition={{
        x: { type: 'spring', bounce: 0.46, duration: 0.85, delay },
        scaleX: { type: 'spring', bounce: 0.62, duration: 1.05, delay },
        opacity: { duration: 0.18, delay },
      }}
      style={{ originX: 1, display: 'inline-block' }}
    >
      {children}
    </motion.span>
  )
}

function Tile({ item, open, onToggle, children }) {
  return (
    <article className={`tile${open ? ' is-open' : ''}`}>
      <h3>
        <button type="button" aria-expanded={open} onClick={onToggle}>
          <span className="tile-index" aria-hidden="true">{item.index}</span>
          <span className="tile-copy">
            <small>{item.kicker}</small>
            <b>{item.title}</b>
            <span className="tile-summary">{item.summary}</span>
          </span>
          {item.span ? <span className="tile-span">{item.span}</span> : null}
          <span className={`tile-mark${open ? ' is-open' : ''}`} aria-hidden="true" />
        </button>
      </h3>
      <div className="tile-panel" inert={open ? undefined : true} aria-hidden={!open}>
        <div className="tile-panel-clip">
          <div className="tile-panel-inner">{children}</div>
        </div>
      </div>
    </article>
  )
}

function WriteMenu({ label, mail }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onPointer = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <div className="write" ref={rootRef}>
      <button
        type="button"
        className="nav-cta"
        aria-expanded={open}
        aria-controls="write-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {label}
      </button>
      {open ? (
        <div className="write-menu" id="write-menu">
          <a href="mailto:kitdeem@gmail.com">{mail}</a>
          <a href="https://t.me/kitdim" rel="noopener">Telegram</a>
        </div>
      ) : null}
    </div>
  )
}

function LangSwitch({ lang, onChange, label }) {
  return (
    <div className="lang" role="group" aria-label={label}>
      {['ru', 'en'].map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={lang === code}
          onClick={() => onChange(code)}
        >
          {lang === code ? <motion.span className="lang-pill" layoutId="lang-pill" /> : null}
          <span>{code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  )
}

function SkillWeb({ lang, text }) {
  const [active, setActive] = useState(null)
  const byId = useMemo(() => Object.fromEntries(nodes.map((node) => [node.id, node])), [])
  const near = useMemo(() => {
    if (!active) return null
    const set = new Set([active])
    threads.forEach(([a, b]) => {
      if (a === active) set.add(b)
      if (b === active) set.add(a)
    })
    return set
  }, [active])

  return (
    <section className="web" id="web">
      <div className="board-head">
        <p className="kicker">{text.webKicker}</p>
        <h2 className="display">{text.webTitle}</h2>
        <p>{text.webLead}</p>
      </div>
      <div className="web-stage">
        <svg className="web-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {threads.map(([a, b], index) => {
            const from = byId[a]
            const to = byId[b]
            const hot = !near || (near.has(a) && near.has(b))
            const midX = (from.x + to.x) / 2
            const bend = from.y < to.y ? -6 : 6
            const midY = (from.y + to.y) / 2 + bend
            return (
              <path
                key={`${a}-${b}`}
                d={`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`}
                className={hot ? 'thread is-hot' : 'thread'}
                style={{ animationDelay: `${Math.min(index, 8) * 0.03}s` }}
                vectorEffect="non-scaling-stroke"
              />
            )
          })}
        </svg>
        {nodes.map((node) => {
          const dim = near && !near.has(node.id)
          return (
            <button
              key={node.id}
              type="button"
              className={`web-node${active === node.id ? ' is-active' : ''}${dim ? ' is-dim' : ''}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onMouseEnter={() => setActive(node.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(node.id)}
              onBlur={() => setActive(null)}
            >
              {node[lang]}
            </button>
          )
        })}
      </div>
    </section>
  )
}

function useToggle() {
  const [openId, setOpenId] = useState(null)
  return {
    openId,
    toggle(id) {
      setOpenId((current) => (current === id ? null : id))
    },
  }
}

function Page({ text, lang }) {
  const work = useToggle()
  const project = useToggle()
  const practice = useToggle()
  const skill = useToggle()

  return (
    <>
      <main id="top">
        <section className="hero">
          <p className="ghost" aria-hidden="true">
            {text.ghost.split('').map((ch, index) => (
              <PopLetter delay={0.08 + index * 0.07} key={`${ch}-${index}`}>
                {ch}
              </PopLetter>
            ))}
          </p>
          <p className="eyebrow">
            <span className="eyebrow-plate">
              <b>{text.eyebrow}</b>
              <span>{text.eyebrowSub}</span>
            </span>
          </p>
          <div className="hero-grid">
            <div>
              <h1>
                <span>{text.name[0]}</span>
                <span className="soft">{text.name[1]}</span>
              </h1>
              <div className="hero-foot">
                <p>{text.lede}</p>
                <a className="cta" href="#projects">{text.cta}</a>
              </div>
            </div>
            <img className="portrait" src="/portrait.jpg" alt={text.alt} />
          </div>
        </section>

        <section className="facts" aria-label={text.factsLabel}>
          {text.facts.map(([label, value]) => (
            <article key={label}>
              <small>{label}</small>
              <strong>{value}</strong>
            </article>
          ))}
        </section>

        <section className="shift" id="about">
          <div className="shift-copy">
            <p className="kicker">{text.aboutKicker}</p>
            <h2 className="display">{text.aboutTitle}</h2>
            <p className="lead">{text.aboutLead}</p>
          </div>
          <div className="shift-list">
            <ol>
              {text.aboutPoints.map((point, index) => (
                <li key={point}>
                  <b>0{index + 1}</b>
                  <span>{point}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="board" id="work">
          <div className="board-head">
            <p className="kicker">{text.workKicker}</p>
            <h2 className="display">{text.workTitle}</h2>
            <p>{text.workLead}</p>
          </div>
          <div className="tiles tiles-stack">
            {text.roles.map((item) => (
              <Tile
                key={item.id}
                item={item}
                open={work.openId === item.id}
                onToggle={() => work.toggle(item.id)}
              >
                <ul>
                  {item.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </Tile>
            ))}
          </div>
        </section>

        <section className="board board-wash" id="projects">
          <div className="board-head">
            <p className="kicker">{text.projectsKicker}</p>
            <h2 className="display">{text.projectsTitle}</h2>
            <p>{text.projectsLead}</p>
          </div>
          <div className="tiles">
            {text.projects.map((item) => (
              <Tile
                key={item.id}
                item={item}
                open={project.openId === item.id}
                onToggle={() => project.toggle(item.id)}
              >
                {item.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <ul className="chips">
                  {item.chips.map((chip) => <li key={chip}>{chip}</li>)}
                </ul>
              </Tile>
            ))}
          </div>
        </section>

        <section className="board board-night" id="cases">
          <div className="board-head">
            <p className="kicker">{text.casesKicker}</p>
            <h2 className="display">{text.casesTitle}</h2>
            <p>{text.casesLead}</p>
          </div>
          <div className="tiles">
            {text.cases.map((item) => (
              <Tile
                key={item.id}
                item={item}
                open={practice.openId === item.id}
                onToggle={() => practice.toggle(item.id)}
              >
                <p>{item.body}</p>
                <ul>
                  {item.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </Tile>
            ))}
          </div>
        </section>

        <section className="board" id="skills">
          <div className="board-head">
            <p className="kicker">{text.skillsKicker}</p>
            <h2 className="display">{text.skillsTitle}</h2>
          </div>
          <div className="tiles tiles-compact">
            {text.skills.map((item) => (
              <Tile
                key={item.id}
                item={item}
                open={skill.openId === item.id}
                onToggle={() => skill.toggle(item.id)}
              >
                <p>{item.body}</p>
              </Tile>
            ))}
          </div>
        </section>

        <section className="edu" id="edu">
          <p className="kicker">{text.eduKicker}</p>
          <div className="edu-row">
            <h2 className="display">{text.eduTitle}</h2>
            <div>
              <b>{text.eduDegree}</b>
              <span>{text.eduPlace}</span>
              <span>{text.eduLang}</span>
            </div>
          </div>
        </section>

        <SkillWeb lang={lang} text={text} />

        <section className="close" id="contact">
          <p className="giant" aria-hidden="true">ДВ</p>
          <h2>{text.closeTitle}</h2>
          <p>{text.closeLead}</p>
          <div className="close-links">
            <a className="cta" href="mailto:kitdeem@gmail.com">kitdeem@gmail.com</a>
            <a className="cta ghost-btn" href="https://t.me/kitdim" rel="noopener">Telegram @kitdim</a>
          </div>
        </section>
      </main>
    </>
  )
}

function pathLang() {
  const path = window.location.pathname.replace(/\/+$/, '')
  if (path === '/en') return 'en'
  if (path === '/ru') return 'ru'
  return null
}

export default function App() {
  const reduce = useReducedMotion()
  const opened = useRef(false)
  const [lang, setLangState] = useState(() => {
    if (typeof window === 'undefined') return 'ru'
    return pathLang() || (window.localStorage.getItem('resume-lang') === 'en' ? 'en' : 'ru')
  })
  const text = copy[lang]

  const setLang = (next) => {
    setLangState(next)
    const url = `/${next}`
    if (window.location.pathname.replace(/\/+$/, '') !== url) {
      window.history.pushState(null, '', url)
    }
  }

  useEffect(() => {
    const onPop = () => {
      const next = pathLang()
      if (next) setLangState(next)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = text.title
    window.localStorage.setItem('resume-lang', lang)
    const url = `/${lang}`
    if (window.location.pathname.replace(/\/+$/, '') !== url) {
      window.history.replaceState(null, '', url)
    }
  }, [lang, text.title])

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    opened.current = true
  }, [])

  return (
    <>
      <svg className="filters" aria-hidden="true">
        <filter id="ring-sky" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="dilated" />
          <feFlood floodColor="#93c5fd" floodOpacity="0.7" result="flood" />
          <feComposite in="flood" in2="dilated" operator="in" result="outline" />
          <feComposite in="outline" in2="SourceAlpha" operator="out" result="ring" />
          <feMerge>
            <feMergeNode in="ring" />
          </feMerge>
        </filter>
      </svg>

      <header className="nav">
        <div className="nav-tools">
          <LangSwitch lang={lang} onChange={setLang} label={text.langLabel} />
          <WriteMenu label={text.write} mail={text.mail} />
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={lang}
          initial={reduce || !opened.current ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: reduce ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <Page text={text} lang={lang} />
        </motion.div>
      </AnimatePresence>
    </>
  )
}
