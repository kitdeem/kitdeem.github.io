import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

const nodes = [
  { id: 'owl', ru: 'Онтологии', en: 'Ontologies', x: 14, y: 14 },
  { id: 'kg', ru: 'Графы знаний', en: 'Knowledge graphs', x: 38, y: 9 },
  { id: 'domain', ru: 'Модели предметных областей', en: 'Domain models', x: 64, y: 15 },
  { id: 'prob', ru: 'Вероятностные модели', en: 'Probabilistic models', x: 86, y: 30 },
  { id: 'meta', ru: 'Метаданные и НСИ', en: 'Metadata and MDM', x: 10, y: 38 },
  { id: 'mbse', ru: 'MBSE', en: 'MBSE', x: 32, y: 32 },
  { id: 'opt', ru: 'Оптимизация', en: 'Optimization', x: 58, y: 38 },
  { id: 'data', ru: 'Данные и закономерности', en: 'Data and patterns', x: 78, y: 52 },
  { id: 'arch', ru: 'Системная архитектура', en: 'Systems architecture', x: 42, y: 58 },
  { id: 'sa', ru: 'Системный анализ', en: 'Systems analysis', x: 14, y: 64 },
  { id: 'nn', ru: 'LLM и GraphRAG', en: 'LLMs and GraphRAG', x: 62, y: 74 },
  { id: 'product', ru: 'Продукт', en: 'Product', x: 90, y: 76 },
  { id: 'sql', ru: 'SQL и хранилища', en: 'SQL and stores', x: 22, y: 88 },
  { id: 'code', ru: 'Любой язык', en: 'Any language', x: 46, y: 90 },
  { id: 'ops', ru: 'Docker и CI', en: 'Docker and CI', x: 74, y: 92 },
]

const threads = [
  ['owl', 'kg'],
  ['owl', 'meta'],
  ['owl', 'mbse'],
  ['owl', 'domain'],
  ['kg', 'domain'],
  ['kg', 'mbse'],
  ['domain', 'prob'],
  ['domain', 'opt'],
  ['domain', 'mbse'],
  ['domain', 'arch'],
  ['prob', 'opt'],
  ['prob', 'data'],
  ['opt', 'data'],
  ['meta', 'sa'],
  ['meta', 'sql'],
  ['mbse', 'sa'],
  ['mbse', 'arch'],
  ['sa', 'arch'],
  ['arch', 'code'],
  ['arch', 'sql'],
  ['arch', 'ops'],
  ['arch', 'nn'],
  ['data', 'sql'],
  ['data', 'nn'],
  ['nn', 'kg'],
  ['nn', 'product'],
  ['prob', 'product'],
  ['opt', 'product'],
  ['code', 'sql'],
  ['code', 'ops'],
]

const copy = {
  ru: {
    write: 'Написать',
    mail: 'Почта',
    langLabel: 'Язык',
    ghost: 'ГРАФ',
    eyebrow: 'Data & Knowledge Architect',
    eyebrowSub: 'Ontologies · Domain Models · Probabilistic Reasoning',
    name: ['Дмитрий', 'Волокитин'],
    lede: 'Семь лет описываю предметные области формально: онтологии, математические и вероятностные модели, на которых держатся данные, сервисы и решения предприятия.',
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
    aboutLead: 'Архитектор моделей данных и знаний. Онтология задаёт понятия и связи предметной области, математическая модель задаёт её ограничения и цели, вероятностная модель показывает, насколько мы уверены в выводе. Вокруг этой модели строю архитектуру системы. Язык реализации для меня не принципиален: логика живёт в модели, а Python, TypeScript или SQL её только исполняют.',
    aboutPoints: [
      'Онтологии и графы знаний: ядро онтологии OSA, модель ИТ-ландшафта атомного холдинга от процессов до инфраструктуры, глоссарий оператора пространственных данных на 2640 документов, прототип онтологии распределительных сетей.',
      'Математические модели: MILP и CP-SAT для планирования производства с теневыми ценами ресурсов, байесовская оценка риска и пользы с неопределённостью для модели подбора.',
      'Данные и закономерности: метаданные, НСИ и классификаторы, интеграция записей разных систем в единый источник истины, извлечение фактов и утверждений из текста.',
      'Системная архитектура: модель в центре, сервисы, интеграции и LLM вокруг неё. Решения фиксирую в ADR, термины в глоссарии, чтобы модель читалась одинаково бизнесом и разработкой.',
      'Преподаю MBSE и онтологическое моделирование: больше 100 человек, среди них студенты старших курсов ведущих вузов РФ.',
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
          'Перевожу внутреннюю R&D-платформу OSA в коммерческий продукт: стратегия выхода, профиль клиента, карты пути заказчика.',
          'Провожу интервью и воркшопы с бизнесом и ИТ заказчиков, по итогам веду бэклог инициатив.',
          'Дорожная карта онтологических активов для инфраструктуры и энергетики, приоритеты по эффекту, охвату и сложности.',
          'Бизнес-кейсы с расчётом эффекта и технические кейсы для enterprise-продаж.',
        ],
      },
      {
        id: 'ecoport',
        index: '02',
        kicker: 'сейчас',
        title: 'Технический директор',
        span: 'Ecoport / Rusecolog',
        summary: 'Архитектура цифрового контура: витрина, CMS, CRM и модель каталога.',
        points: [
          'Спроектировал цифровой контур направления с нуля: витрина, CMS на Strapi и CRM на Twenty связаны между собой. Обе системы поднял и поддерживаю.',
          'Модель каталога добавок и их сочетаний, на которой стоит витрина.',
          'Позиционирование направления и коммерческое предложение back-office для производителя добавок.',
        ],
      },
      {
        id: 'engineer',
        index: '03',
        kicker: '2020 - ноябрь 2025',
        title: 'Системный и knowledge-инженер',
        span: 'Time & Space',
        summary: 'Ядро онтологии OSA, модели данных заказчиков, архитектура интеграций, MBSE.',
        points: [
          'Системный и knowledge-инженер OSA: ядро онтологии, метамодели нотаций и сервисная архитектура для интеграции данных крупных заказчиков.',
          'Строил онтологические и информационные модели предметных областей заказчиков: ИТ-ландшафт, пространственные данные, распределительные сети.',
          'Модели данных в ERD и UML, контракты REST API в OpenAPI, обмен между сервисами через RabbitMQ, ролевая модель доступа.',
          'Собирал требования с заказчиками, писал спецификации и ТЗ, проверял реализацию. Онбордил новых аналитиков и ревьюил их модели.',
          'MVP графа знаний «Атлас образования»: граф понятий курса, собранный из учебного текста.',
          'Преподаю MBSE и онтологическое моделирование разным организациям. Обучил больше 100 человек, в том числе студентов старших курсов ведущих вузов РФ.',
          'Контур поставки: CI/CD на GitLab CI с приватными раннерами, корпоративный сайт компании.',
        ],
      },
    ],
    projectsKicker: 'Проекты',
    projectsTitle: 'Основные и актуальные проекты',
    projectsLead: 'В плитке короткая суть. Внутри модель, задача и стек.',
    projects: [
      {
        id: 'hub',
        index: '01',
        kicker: '2025-2026',
        title: 'OntoGraph Hub',
        summary: 'Графы знаний с LLM: импакт-анализ и поддержка решений.',
        body: [
          'Реестр графов знаний, просмотр графа и онтологии, импакт-анализ по связям и поддержка решений. LLM отвечает только по триплетам графа, а изменения графа, которые она предлагает, проходят проверку на сервере.',
          'Спроектировал архитектуру: граф остаётся источником истины, модель подключается как серверная, как своя модель пользователя через OpenAI-совместимый API или не подключается вовсе.',
        ],
        chips: ['граф знаний', 'онтология', 'RDF', 'GraphRAG', 'импакт-анализ', 'LLM'],
      },
      {
        id: 'osa',
        index: '02',
        kicker: 'с 2022',
        title: 'OSA',
        summary: 'LCNC-платформа, где предприятие описывает предметную область одной моделью. Реестр российского ПО №7147.',
        body: [
          'Занимаюсь ядром онтологии, метамоделями нотаций, семантической структурой данных, интеграцией графа знаний и архитектурой поставки.',
        ],
        chips: ['RDF / OWL', 'метамодели', 'граф знаний', 'MBSE', 'PostgreSQL'],
      },
      {
        id: 'matcher',
        index: '03',
        kicker: '2026',
        title: 'Вероятностная модель подбора',
        summary: 'Байесовская оценка риска и пользы с неопределённостью.',
        body: [
          'Модель подбора БАД и велнес-услуг. Риск и польза хранятся как бета-распределения: экспертное знание задаёт априорную оценку, уровень доказательности задаёт её вес в наблюдениях, исходы покупателей её обновляют.',
          'С порогом сравнивается верхняя граница риска, а не среднее, поэтому малоизученный вариант не проходит, пока не накопятся данные. Независимые причины риска сводятся через noisy-OR, доверие к признакам асимметрично в пользу осторожности. LLM только предлагает цели, а решение детерминировано и воспроизводимо по версии модели.',
          'Предметная область описана глоссарием и 13 ADR.',
        ],
        chips: ['байесовское обновление', 'Beta-распределение', 'noisy-OR', 'Монте-Карло', 'ADR', 'Python'],
      },
      {
        id: 'optiplan',
        index: '04',
        kicker: '2026',
        title: 'Планирование проката',
        summary: 'MILP и CP-SAT для производителя плоского проката.',
        body: [
          'Два уровня планирования за одним API. S&OP на месяцы: MILP решает, что, на каком стане и когда катать, с кампаниями, переналадками, лимитами слябов, складом и упущенными продажами. Затем LP решается заново, чтобы получить теневые цены: сколько стоит ещё один час стана или тонна слябов.',
          'Графикование на часы: CP-SAT строит последовательность заказов с переналадками, которые зависят от порядка. Каждая модель сравнивается с ручной эвристикой, а план проверяет независимый от модели оценщик. Сценарии: рост спроса, простой стана, дефицит слябов.',
        ],
        chips: ['MILP', 'LP и двойственность', 'CP-SAT', 'Pyomo', 'HiGHS', 'OR-Tools'],
      },
      {
        id: 'atlas',
        index: '05',
        kicker: 'MVP',
        title: 'Атлас образования',
        summary: 'Граф курса и понятий для методолога.',
        body: [
          'Из учебного текста собирается карта: понятия, фрагменты, связи термин-термин. Методолог правит граф, видит покрытие и получает рекомендации, где в курсе не хватает материала.',
          'Правки методолога лежат отдельным слоем поверх сырого выхода модели, поэтому граф можно пересобрать без потери ручной работы.',
        ],
        chips: ['граф понятий', 'извлечение терминов', 'анализ покрытия', 'Cytoscape.js'],
      },
      {
        id: 'msu',
        index: '06',
        kicker: '2025-2026',
        title: 'Образовательные продукты с вузами',
        summary: 'Совместные программы MBSE, программной и онтологической инженерии на OSA.',
        body: [
          'Вместе с ведущими вузами РФ подготовили программы цифровых навыков по модельно-ориентированной системной, программной и онтологической инженерии.',
          'Три продукта на OSA: методические основы MBSE, методические основы программной инженерии по SWEBOK V4, менеджмент риска кибербезопасности. В учебном году 2025/2026 вёл занятия у студентов старших курсов.',
          'Публикация на сайте Time & Space.',
        ],
        chips: ['MBSE', 'OSA', 'онтологии', 'вузы РФ'],
      },
      {
        id: 'claims',
        index: '07',
        kicker: 'R&D',
        title: 'Live Claim Validator',
        summary: 'Проверка сказанного по ходу разговора.',
        body: [
          'Живая речь режется на высказывания, из них достаются проверяемые утверждения. Фактические сверяются с источниками и возвращаются с цитатами. Выводные проверяются структурно, через разбор и NLI.',
          'Сессия показывает флаги и журнал событий пайплайна.',
        ],
        chips: ['NLP', 'извлечение утверждений', 'NLI', 'spaCy', 'проверка по источникам'],
      },
      {
        id: 'sem',
        index: '08',
        kicker: 'свой контур',
        title: 'sem-tools',
        summary: 'Контур управления семантикой и автоматизацией.',
        body: [
          'Control plane над Semantica и self-hosted n8n. Онтология, граф контекста, политики и решения, которые можно проследить. Шаги автоматизации пишут проверки политик обратно в граф.',
          'CLI, API и интерфейс со схемой графа и причинной цепочкой.',
        ],
        chips: ['онтология', 'граф контекста', 'политики', 'прослеживаемость', 'n8n'],
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
        id: 'owl',
        index: '01',
        title: 'Онтологии и семантика',
        summary: 'RDF, OWL, Semantic Web, метамодели.',
        body: 'Онтологическое моделирование предметных областей: классы, свойства, ограничения, правила согласованности. RDF и OWL, Turtle, rdflib, Semantic Web. Метамодели нотаций и онтологическое ядро платформы, на котором заказчики строят свои модели.',
      },
      {
        id: 'kg',
        index: '02',
        title: 'Графы знаний',
        summary: 'Схема графа, импакт-анализ, связи доменов.',
        body: 'Проектирование схемы графа и его наполнение из документов и систем. Связи термина с документами, процессами, классификаторами и моделями данных. Импакт-анализ по связям, граф контекста и прослеживаемость решений, визуализация графа.',
      },
      {
        id: 'domain',
        index: '03',
        title: 'Модели предметных областей',
        summary: 'Концептуальные и логические модели, MBSE, DDD.',
        body: 'Формальное описание предметной области от понятий до ограничений. Концептуальные и логические модели данных, ERD, UML, SysML, MBSE. Единый язык с бизнесом через глоссарий, архитектурные решения в ADR. Модели ИТ-ландшафта, пространственных данных, энергосетей, производства и ритейла.',
      },
      {
        id: 'prob',
        index: '04',
        title: 'Вероятностные модели',
        summary: 'Байесовское обновление, неопределённость, решения по порогу.',
        body: 'Байесовские модели: априорная оценка из экспертного знания, обновление по наблюдениям, бета-биномиальная модель. Интервалы неопределённости через Монте-Карло, комбинация причин через noisy-OR, решения по верхней границе риска. Воспроизводимый расчёт по версии модели.',
      },
      {
        id: 'opt',
        index: '05',
        title: 'Математическая оптимизация',
        summary: 'MILP, LP, CP-SAT, теневые цены.',
        body: 'Постановка задачи как модели: переменные, ограничения, целевая функция. MILP и LP, двойственность и теневые цены ресурсов, программирование в ограничениях на CP-SAT. Pyomo, HiGHS, OR-Tools. Сравнение с эвристикой, независимая оценка плана, сценарии и стресс-тесты.',
      },
      {
        id: 'data',
        index: '06',
        title: 'Данные и закономерности',
        summary: 'Метаданные, НСИ, интеграция, извлечение фактов.',
        body: 'Метаданные и каталоги: бизнес-глоссарии, НСИ, классификаторы. Интеграция записей разных систем в единый источник истины. SQL и PostgreSQL. Извлечение понятий, фактов и утверждений из текста: NLP-пайплайны, spaCy, NLI, проверка по источникам.',
      },
      {
        id: 'arch',
        index: '07',
        title: 'Системная архитектура',
        summary: 'Модель в центре, язык реализации вторичен.',
        body: 'Строю систему вокруг модели: сервисы, интеграции и интерфейсы её исполняют, а не дублируют. Контракты REST API в OpenAPI, обмен через RabbitMQ, ролевая модель доступа, требования и спецификации, Docker и CI/CD. Язык не принципиален: работал на Python, TypeScript и SQL, остальное беру под задачу.',
      },
      {
        id: 'nn',
        index: '08',
        title: 'LLM поверх модели',
        summary: 'GraphRAG, ответы со ссылкой на факт.',
        body: 'LLM-ассистенты и агенты, которые опираются на граф знаний: RAG и GraphRAG, сборка контекста из онтологии, проверка ответа по источнику. Модель остаётся источником решения, LLM предлагает и объясняет. Политики и рабочие процессы на n8n.',
      },
      {
        id: 'product',
        index: '09',
        title: 'Продукт',
        summary: 'Discovery, дорожная карта, бизнес-кейсы.',
        body: 'Вывод R&D в B2B: интервью и воркшопы, профиль клиента, путь заказчика, дорожная карта и бэклог. Пилоты и PoC до внедрения, бизнес-кейсы с расчётом эффекта.',
      },
    ],
    eduKicker: 'Образование',
    eduTitle: 'МИСИС',
    eduDegree: 'Бакалавр, материаловедение и технологии материалов',
    eduPlace: 'Национальный исследовательский технологический университет, Москва, 2017-2021',
    eduLang: 'Русский родной. Английский C1+. Китайский A1.',
    webKicker: 'Связи',
    webTitle: 'Связи между умениями',
    webLead: 'Нить соединяет навыки, которые работают в одной задаче. Наверху модели, внизу то, чем они исполняются. Наведите на узел, чтобы увидеть его связи.',
    closeTitle: 'Связаться со мной',
    closeLead: 'Москва. Открыт к релокации и удалённой работе.',
    title: 'Дмитрий Волокитин, архитектор моделей данных и знаний',
  },
  en: {
    write: 'Contact',
    mail: 'Email',
    langLabel: 'Language',
    ghost: 'GRAPH',
    eyebrow: 'Data & Knowledge Architect',
    eyebrowSub: 'Ontologies · Domain Models · Probabilistic Reasoning',
    name: ['Dmitrii', 'Volokitin'],
    lede: 'For seven years I have been describing domains formally: ontologies, mathematical and probabilistic models that an enterprise\'s data, services, and decisions rest on.',
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
    aboutLead: 'Architect of data and knowledge models. The ontology sets the concepts and links of a domain, the mathematical model sets its constraints and goals, and the probabilistic model shows how sure we are of a conclusion. I build the system architecture around that model. The implementation language does not matter much to me: the logic lives in the model, and Python, TypeScript, or SQL only run it.',
    aboutPoints: [
      'Ontologies and knowledge graphs: the OSA ontology core, an IT landscape model for a nuclear holding from processes down to infrastructure, a 2,640-document glossary for a spatial data operator, and a prototype ontology of distribution networks.',
      'Mathematical models: MILP and CP-SAT for production planning with shadow prices of resources, and Bayesian estimates of risk and benefit with uncertainty for a recommendation model.',
      'Data and patterns: metadata, reference data, and classifiers, records from different systems joined into one source of truth, and facts and claims pulled from text.',
      'Systems architecture: the model in the center, with services, integrations, and LLMs around it. I record decisions in ADRs and terms in a glossary, so business and engineering read the model the same way.',
      'I teach MBSE and ontology modeling: more than 100 people, including senior students at leading Russian universities.',
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
          'Moving the internal OSA platform into a commercial product: go-to-market, client profile, and customer journey maps.',
          'I run interviews and workshops with client business and IT teams and keep the initiative backlog from them.',
          'Roadmap of ontology assets for infrastructure and energy, prioritized by impact, reach, and effort.',
          'Business cases with the expected effect, and technical cases for enterprise sales.',
        ],
      },
      {
        id: 'ecoport',
        index: '02',
        kicker: 'now',
        title: 'Technical Director',
        span: 'Ecoport / Rusecolog',
        summary: 'Architecture of the digital stack: storefront, CMS, CRM, and the catalog model.',
        points: [
          'Designed the digital stack of this line from scratch: the storefront, a Strapi CMS, and a Twenty CRM are connected. I set both systems up and I maintain them.',
          'The model of the supplement catalog and its combinations that the storefront runs on.',
          'Positioning of the line and a back-office proposal for a supplement maker.',
        ],
      },
      {
        id: 'engineer',
        index: '03',
        kicker: '2020 - November 2025',
        title: 'Systems and knowledge engineer',
        span: 'Time & Space',
        summary: 'The OSA ontology core, client data models, integration architecture, and MBSE.',
        points: [
          'Systems and knowledge engineer on OSA: the ontology core, notation metamodels, and the service architecture used to integrate data for large clients.',
          'Built ontology and information models of client domains: IT landscape, spatial data, and distribution networks.',
          'Data models in ERD and UML, REST API contracts in OpenAPI, service exchange over RabbitMQ, and the access role model.',
          'Gathered requirements with clients, wrote specifications, and checked the result. Onboarded new analysts and reviewed their models.',
          'The Education Atlas knowledge-graph MVP: a concept graph of a course built from the teaching text.',
          'I teach MBSE and ontology modeling for different organizations. More than 100 people, including senior students at leading Russian universities.',
          'Delivery: CI/CD on GitLab CI with private runners, and the company site.',
        ],
      },
    ],
    projectsKicker: 'Projects',
    projectsTitle: 'Main and current projects',
    projectsLead: 'The tile keeps the point. Inside are the model, the job, and the stack.',
    projects: [
      {
        id: 'hub',
        index: '01',
        kicker: '2025-2026',
        title: 'OntoGraph Hub',
        summary: 'Knowledge graphs with LLMs: impact analysis and decision support.',
        body: [
          'A registry of knowledge graphs, a graph and ontology viewer, impact analysis along the links, and decision support. The LLM answers only from the graph triples, and the graph changes it suggests are checked on the server.',
          'I designed the architecture: the graph stays the source of truth, and the model plugs in as a server model, the user\'s own model over an OpenAI-compatible API, or not at all.',
        ],
        chips: ['knowledge graph', 'ontology', 'RDF', 'GraphRAG', 'impact analysis', 'LLM'],
      },
      {
        id: 'osa',
        index: '02',
        kicker: 'since 2022',
        title: 'OSA',
        summary: 'An LCNC platform where a company describes its domain as one model. Listed in the Russian software registry, no. 7147.',
        body: [
          'I work on the ontology core, notation metamodels, the semantic data structure, knowledge-graph integration, and delivery architecture.',
        ],
        chips: ['RDF / OWL', 'metamodels', 'knowledge graph', 'MBSE', 'PostgreSQL'],
      },
      {
        id: 'matcher',
        index: '03',
        kicker: '2026',
        title: 'Probabilistic recommendation model',
        summary: 'Bayesian estimates of risk and benefit with uncertainty.',
        body: [
          'A model that recommends supplements and wellness services. Risk and benefit are stored as beta distributions: expert knowledge sets the prior, the level of evidence sets how many observations it is worth, and customer outcomes update it.',
          'The threshold is compared with the upper bound of risk, not the mean, so a little-studied option does not pass until data builds up. Independent causes of risk combine through noisy-OR, and trust in a signal is asymmetric, leaning toward caution. The LLM only suggests goals; the decision is deterministic and reproducible from the model version.',
          'The domain is described by a glossary and 13 ADRs.',
        ],
        chips: ['Bayesian updating', 'Beta distribution', 'noisy-OR', 'Monte Carlo', 'ADR', 'Python'],
      },
      {
        id: 'optiplan',
        index: '04',
        kicker: '2026',
        title: 'Rolling mill planning',
        summary: 'MILP and CP-SAT for a flat-rolled steel maker.',
        body: [
          'Two planning levels behind one API. S&OP over months: a MILP decides what to roll, on which mill, and when, with campaigns, changeovers, slab limits, stock, and lost sales. Then the LP is solved again to get shadow prices: what one more mill hour or one more tonne of slabs is worth.',
          'Scheduling over hours: CP-SAT builds the order sequence with changeovers that depend on the order. Each model is compared with a manual heuristic, and a model-independent evaluator checks the plan. Scenarios: demand growth, a mill outage, a slab shortage.',
        ],
        chips: ['MILP', 'LP and duality', 'CP-SAT', 'Pyomo', 'HiGHS', 'OR-Tools'],
      },
      {
        id: 'atlas',
        index: '05',
        kicker: 'MVP',
        title: 'Education Atlas',
        summary: 'A course and concept graph for an instructional designer.',
        body: [
          'A teaching text becomes a map: concepts, fragments, term-to-term links. The designer edits the graph, sees coverage, and gets recommendations where the course is thin.',
          'Designer edits sit in a separate layer on top of the raw model output, so the graph can be rebuilt without losing manual work.',
        ],
        chips: ['concept graph', 'term extraction', 'coverage analysis', 'Cytoscape.js'],
      },
      {
        id: 'msu',
        index: '06',
        kicker: '2025-2026',
        title: 'Educational products with universities',
        summary: 'Joint programs in MBSE, software engineering, and ontology engineering on OSA.',
        body: [
          'With leading Russian universities we prepared digital-skill programs in model-based systems, software, and ontology engineering.',
          'Three products on OSA: methodological foundations of MBSE, methodological foundations of software engineering from SWEBOK V4, and cybersecurity risk management. In the 2025/2026 academic year I taught senior students.',
          'Publication on the Time & Space site.',
        ],
        chips: ['MBSE', 'OSA', 'ontologies', 'Russian universities'],
      },
      {
        id: 'claims',
        index: '07',
        kicker: 'R&D',
        title: 'Live Claim Validator',
        summary: 'Checking what is said while the conversation is still going.',
        body: [
          'Live speech is split into utterances, and checkable claims are pulled out of them. Factual claims are checked against sources and returned with citations. Inferential claims are checked structurally, through parsing and NLI.',
          'The session shows flags and a log of pipeline events.',
        ],
        chips: ['NLP', 'claim extraction', 'NLI', 'spaCy', 'source checking'],
      },
      {
        id: 'sem',
        index: '08',
        kicker: 'own loop',
        title: 'sem-tools',
        summary: 'A control loop for semantics and automation.',
        body: [
          'A control plane over Semantica and self-hosted n8n. Ontology, context graph, policies, and decisions that can be traced. Automation steps write policy checks back into the graph.',
          'CLI, API, and an interface with the graph and the causal chain.',
        ],
        chips: ['ontology', 'context graph', 'policies', 'traceability', 'n8n'],
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
        id: 'owl',
        index: '01',
        title: 'Ontologies and semantics',
        summary: 'RDF, OWL, the Semantic Web, metamodels.',
        body: 'Ontology modeling of domains: classes, properties, restrictions, and consistency rules. RDF and OWL, Turtle, rdflib, the Semantic Web. Notation metamodels and the ontology core of a platform that clients build their own models on.',
      },
      {
        id: 'kg',
        index: '02',
        title: 'Knowledge graphs',
        summary: 'Graph schema, impact analysis, links across domains.',
        body: 'Designing the graph schema and filling it from documents and systems. Links from a term to documents, processes, classifiers, and data models. Impact analysis along the links, context graphs and traceable decisions, graph visualization.',
      },
      {
        id: 'domain',
        index: '03',
        title: 'Domain models',
        summary: 'Conceptual and logical models, MBSE, DDD.',
        body: 'A formal description of a domain from concepts to constraints. Conceptual and logical data models, ERD, UML, SysML, MBSE. One language with the business through a glossary, architecture decisions in ADRs. Models of IT landscapes, spatial data, power networks, manufacturing, and retail.',
      },
      {
        id: 'prob',
        index: '04',
        title: 'Probabilistic models',
        summary: 'Bayesian updating, uncertainty, threshold decisions.',
        body: 'Bayesian models: a prior from expert knowledge, updates from observations, the beta-binomial model. Uncertainty intervals through Monte Carlo, causes combined through noisy-OR, decisions on the upper bound of risk. Reproducible results from a model version.',
      },
      {
        id: 'opt',
        index: '05',
        title: 'Mathematical optimization',
        summary: 'MILP, LP, CP-SAT, shadow prices.',
        body: 'Stating a problem as a model: variables, constraints, and an objective. MILP and LP, duality and shadow prices of resources, constraint programming with CP-SAT. Pyomo, HiGHS, OR-Tools. Comparison with a heuristic, independent plan evaluation, scenarios, and stress tests.',
      },
      {
        id: 'data',
        index: '06',
        title: 'Data and patterns',
        summary: 'Metadata, reference data, integration, fact extraction.',
        body: 'Metadata and catalogs: business glossaries, reference data, classifiers. Records from different systems joined into one source of truth. SQL and PostgreSQL. Concepts, facts, and claims pulled from text: NLP pipelines, spaCy, NLI, checking against sources.',
      },
      {
        id: 'arch',
        index: '07',
        title: 'Systems architecture',
        summary: 'The model in the center, the language second.',
        body: 'I build the system around the model: services, integrations, and interfaces run it rather than duplicate it. REST API contracts in OpenAPI, exchange over RabbitMQ, access role models, requirements and specifications, Docker and CI/CD. The language is not the point: I have worked in Python, TypeScript, and SQL, and I pick up others for the job.',
      },
      {
        id: 'nn',
        index: '08',
        title: 'LLMs on top of the model',
        summary: 'GraphRAG, answers that point to the fact.',
        body: 'LLM assistants and agents grounded in a knowledge graph: RAG and GraphRAG, context assembled from the ontology, answers checked against the source. The model stays the source of the decision; the LLM suggests and explains. Policies and n8n workflows.',
      },
      {
        id: 'product',
        index: '09',
        title: 'Product',
        summary: 'Discovery, roadmap, business cases.',
        body: 'Taking R&D into B2B: interviews and workshops, client profile, customer journey, roadmap, and backlog. Pilots and PoCs through to rollout, business cases with the expected effect.',
      },
    ],
    eduKicker: 'Education',
    eduTitle: 'MISIS',
    eduDegree: 'B.Sc., Materials Science and Materials Technology',
    eduPlace: 'National University of Science and Technology, Moscow, 2017-2021',
    eduLang: 'Russian, native. English, C1+. Chinese, A1.',
    webKicker: 'Links',
    webTitle: 'How the skills connect',
    webLead: 'A thread joins skills that work on the same job. Models sit at the top, and what runs them sits at the bottom. Hover a node to see its links.',
    closeTitle: 'Contact me',
    closeLead: 'Moscow. Open to relocation and remote work.',
    title: 'Dmitrii Volokitin, data and knowledge architect',
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
