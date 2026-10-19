import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

const roles = [
  {
    id: 'director',
    index: '01',
    kicker: 'Ноябрь 2025 — сейчас',
    title: 'Директор по развитию',
    span: 'Time & Space',
    summary: 'Вывод OSA из внутреннего R&D в коммерческий B2B-продукт.',
    points: [
      'Перевёл внутреннюю R&D-платформу OSA в коммерческий продукт: стратегия выхода, профиль клиента, карты пути заказчика.',
      'Запустил корпоративную подачу платформы и написал технические кейсы для enterprise-продаж.',
      'Веду дорожную карту онтологических активов для инфраструктуры и энергетики.',
    ],
  },
  {
    id: 'engineer',
    index: '02',
    kicker: 'Июнь 2022 — ноябрь 2025',
    title: 'Системный и knowledge-инженер',
    span: 'Time & Space',
    summary: 'Онтология OSA, Атлас, обучение MBSE, сайт и CI/CD.',
    points: [
      'Ведущий системный и knowledge-инженер OSA: ядро онтологии и сервисная архитектура для интеграции данных крупных заказчиков.',
      'С нуля собрал MVP графа знаний «Атлас образования» для методологов.',
      'Спроектировал и провёл программу обучения MBSE для 60+ инженеров.',
      'Собрал и вывел корпоративный сайт tas-project.ru на React, Strapi и Node.js.',
      'Поднял CI/CD на GitLab CI и приватных раннерах.',
    ],
  },
]

const projects = [
  {
    id: 'osa',
    index: '01',
    letter: 'О',
    kicker: '2022 — сейчас',
    title: 'OSA',
    summary: 'Онтологическая платформа автоматизации. Реестр российского ПО №7147.',
    body: [
      'Платформа, на которой предприятие описывает предметную область моделью, а не набором разъехавшихся документов. Я вёл семантическую структуру данных, интеграцию графа знаний и архитектуру поставки.',
      'Контур поставки — монорепозиторий сервисов: Node.js и Express, PostgreSQL, Vue, фоновые воркеры через RabbitMQ, Docker. Смена нотации моделирования не требует переписывать код: метамодель живёт отдельно от экземпляров.',
    ],
    chips: ['RDF / OWL', 'граф знаний', 'Node.js', 'Vue', 'PostgreSQL', 'RabbitMQ', 'Docker'],
  },
  {
    id: 'atlas',
    index: '02',
    letter: 'А',
    kicker: 'MVP',
    title: 'Атлас образования',
    summary: 'Граф курса и понятий для методолога.',
    body: [
      'Из учебного текста собирается карта: понятия, фрагменты, связи термин–термин. Методолог правит граф, видит покрытие и получает рекомендации, где курс дырявый. Курс выгружается в Markdown и HTML.',
      'Ручные правки не затирают сырой выход модели — они ложатся отдельным слоем поверх.',
    ],
    chips: ['Vue 3', 'TypeScript', 'FastAPI', 'Cytoscape.js', 'Pinia'],
  },
  {
    id: 'claims',
    index: '03',
    letter: 'П',
    kicker: 'R&D',
    title: 'Live Claim Validator',
    summary: 'Проверка сказанного по ходу разговора.',
    body: [
      'Живая речь режется на высказывания, из них достаются проверяемые утверждения. Фактические сверяются с источниками и возвращаются с цитатами. Выводные проверяются структурно, без внешнего поиска: spaCy и NLI.',
      'Сессия показывает флаги и журнал событий пайплайна — чтобы было видно, почему система подняла руку.',
    ],
    chips: ['Next.js', 'Python', 'FastAPI', 'spaCy', 'NLI'],
  },
  {
    id: 'sem',
    index: '04',
    letter: 'С',
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
    index: '05',
    letter: 'К',
    kicker: '2022 — 2025',
    title: 'Сайт и контур поставки',
    summary: 'tas-project.ru и GitLab CI.',
    body: [
      'Корпоративный сайт на React, Strapi и Node.js: контент и технический маркетинг в одной системе.',
      'Рядом — CI/CD на GitLab CI с приватными раннерами, чтобы сборка и выкладка шли одинаково у разработчиков и на серверах.',
    ],
    chips: ['React', 'Strapi', 'Node.js', 'GitLab CI', 'Docker'],
  },
  {
    id: 'eco',
    index: '06',
    letter: 'Э',
    kicker: 'смежные работы',
    title: 'EcoPort',
    summary: 'Каталог и back-office вокруг продуктовых данных.',
    body: [
      'EcoPort — каталог БАДов и их сочетаний: Next.js, Strapi 5, PostgreSQL, полный Docker-контур для разработки и поставки.',
      'Отдельно собирал коммерческое предложение back-office для производителя «Фитовит»: как удерживать продуктовую систему на дистанции нескольких лет, а не разовой витриной.',
    ],
    chips: ['Next.js', 'Strapi 5', 'PostgreSQL', 'React', 'Vite'],
  },
]

const cases = [
  {
    id: 'rosatom',
    index: '01',
    kicker: 'Инфраструктура',
    title: 'ИТ-архитектура Росатома',
    summary: 'Многослойная модель ландшафта на OSA. Поиск быстрее до 40%.',
    body: 'На OSA автоматизирован процесс «Управление ИТ-архитектурой и интеграцией» для отраслевого ландшафта. Модель идёт от бизнес-процессов до физической инфраструктуры: метамодель нотации, экземпляры, согласование целевой архитектуры, хранилище документации, справочники и аутентификация.',
    points: [
      'Поиск по ландшафту быстрее до 40%.',
      'Затраты на моделирование и на создание компонент за счёт переиспользования — ниже до 10%.',
      'Единый источник по компонентам архитектуры. Решение сертифицировано ФСТЭК и работает в контурах с повышенными требованиями к безопасности.',
    ],
  },
  {
    id: 'spd',
    index: '02',
    kicker: 'Пространственные данные',
    title: 'База знаний СПД',
    summary: 'Глоссарий Роскадастра: около 2640 документов на одном языке.',
    body: 'Методология и глоссарий для ППК «Роскадастр»: единый понятийный аппарат пространственных данных, чтобы документы, модели, сервисы и классификаторы говорили на одном языке. В базе порядка 2640 документов, из них в 2025 году создано около 450 и актуализировано около 200.',
    points: [
      'Актуализация терминов под новые редакции НПА и стандартов, разделы по ГИС, метаданным, сервисам и онтологиям.',
      'Связи термина с документами, процессами, классификаторами и моделями данных.',
      'Основа для онтологического ядра СПД: термин и сущность цифрового продукта больше не живут врозь.',
    ],
  },
  {
    id: 'energy',
    index: '03',
    kicker: 'Энергетика',
    title: 'Сети и подготовка инженеров',
    summary: 'MBSE для 60+ инженеров и модель распределительных сетей.',
    body: 'Программа MBSE, которую я спроектировал и провёл, — 60+ инженеров. Рядом отраслевой трек «Инженер по моделированию распределительных сетей» с EnergyNet University и «Тавридой Электрик»: два набора, больше 400 заявок, около 150 выпускников. Компетенции передавались в СевГУ и ФАУ «Главгосэкспертиза России».',
    points: [
      'Непрерывная траектория: от курса по цифровому моделированию сетей до отраслевой практики.',
      'НИОКР для ПАО «РусГидро»: прототип онтологической модели распределительных сетей и объектов локальной энергетики, со стыковкой к ТОиР, СК-11, ГИС и телеметрии.',
    ],
  },
]

const skills = [
  {
    id: 'ke',
    index: '01',
    title: 'Инженерия знаний',
    summary: 'Онтологии, графы, MBSE.',
    body: 'Онтологии RDF/OWL, графы знаний, Semantic Web, MBSE, метамодели нотаций, глоссарии и правила согласованности терминов.',
  },
  {
    id: 'lang',
    index: '02',
    title: 'Языки',
    summary: 'TypeScript, Python, JavaScript, SQL.',
    body: 'TypeScript и JavaScript на фронтенде и в Node.js. Python — FastAPI, пайплайны и NLP. SQL — PostgreSQL как основное хранилище.',
  },
  {
    id: 'api',
    index: '03',
    title: 'Бэкенд и API',
    summary: 'Node.js, FastAPI, Strapi, очереди.',
    body: 'Node.js, Express, FastAPI, Strapi, REST. PostgreSQL. Очереди на RabbitMQ между воркерами платформы.',
  },
  {
    id: 'ui',
    index: '04',
    title: 'Фронтенд',
    summary: 'React, Next.js, Vue 3.',
    body: 'React, Next.js, Vue 3. Редакторы графов, сессионные интерфейсы, контентные платформы.',
  },
  {
    id: 'ops',
    index: '05',
    title: 'Поставка',
    summary: 'Docker и GitLab CI.',
    body: 'Docker, GitLab CI/CD, приватные раннеры, VPS. Одинаковая среда у разработчика и на сервере.',
  },
  {
    id: 'product',
    index: '06',
    title: 'Продукт',
    summary: 'R&D в B2B.',
    body: 'Вывод R&D в B2B: профиль клиента, путь заказчика, дорожная карта, технические кейсы для продаж.',
  },
]

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
  const reduce = useReducedMotion()
  return (
    <article className={`tile${open ? ' is-open' : ''}`}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          onClick={onToggle}
        >
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
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            className="tile-panel"
            key="panel"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="tile-panel-inner">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
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

export default function App() {
  const work = useToggle()
  const project = useToggle()
  const practice = useToggle()
  const skill = useToggle()

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
        <a className="brand" href="#top">
          ДМИТРИЙ<i>В</i>
        </a>
        <nav className="nav-links" aria-label="Разделы">
          <a href="#about">О себе</a>
          <a href="#work">Опыт</a>
          <a href="#projects">Проекты</a>
          <a href="#cases">Внедрения</a>
          <a href="#skills">Навыки</a>
        </nav>
        <a className="nav-cta" href="mailto:kitdeem@gmail.com">Написать</a>
      </header>

      <main id="top">
        <section className="hero">
          <p className="ghost" aria-hidden="true">
            {'ГРАФ'.split('').map((ch, index) => (
              <PopLetter delay={0.08 + index * 0.07} key={`${ch}-${index}`}>
                {ch}
              </PopLetter>
            ))}
          </p>
          <p className="eyebrow">
            Systems Architect
            <span>Knowledge Graphs · MBSE</span>
          </p>
          <h1>
            <span>Дмитрий</span>
            <span className="soft">Волокитин</span>
          </h1>
          <div className="hero-foot">
            <p>
              Семь лет собираю онтологические платформы: от модели предметной
              области и архитектуры сервисов до продукта, который можно продать
              предприятию. Руковожу развитием OSA и сам пишу код.
            </p>
            <a className="cta" href="#projects">Смотреть проекты</a>
          </div>
        </section>

        <section className="facts" aria-label="Коротко">
          <article>
            <small>Сейчас</small>
            <strong>Директор по развитию</strong>
          </article>
          <article>
            <small>Компания</small>
            <strong>Time & Space</strong>
          </article>
          <article>
            <small>Город</small>
            <strong>Москва</strong>
          </article>
          <article>
            <small>Формат</small>
            <strong>Релокация и удалёнка</strong>
          </article>
        </section>

        <section className="shift" id="about">
          <div className="shift-copy">
            <p className="kicker">О себе</p>
            <h2 className="display">Модель и код в одном контуре</h2>
            <p className="lead">
              Системный архитектор с фокусом на графах знаний, модельно-ориентированной
              системной инженерии и семантических технологиях. Провожу онтологическую
              платформу от концепции до коммерческого продукта.
            </p>
          </div>
          <div className="shift-list">
            <ol>
              <li>
                <b>01</b>
                <span>Сейчас — дорожная карта OSA, вывод на рынок, кейсы для инфраструктуры и энергетики.</span>
              </li>
              <li>
                <b>02</b>
                <span>До этого — ядро онтологии, фронтенд, сайт компании и обучение инженеров MBSE.</span>
              </li>
              <li>
                <b>03</b>
                <span>Единый источник модели. Нотация меняется без переписывания кода. Решение видно по графу.</span>
              </li>
            </ol>
          </div>
        </section>

        <section className="board" id="work">
          <div className="board-head">
            <p className="kicker">Опыт</p>
            <h2 className="display">Две роли, один продукт</h2>
            <p>Нажмите плитку, чтобы раскрыть, что именно делал в этой роли.</p>
          </div>
          <div className="tiles tiles-stack">
            {roles.map((item) => (
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
            <p className="kicker">Проекты</p>
            <h2 className="display">Что собирал руками</h2>
            <p>Плитка держит суть. Внутри — контур, стек и зачем это было нужно.</p>
          </div>
          <div className="tiles">
            {projects.map((item) => (
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
            <p className="kicker">Внедрения</p>
            <h2 className="display">Где модель встретила ландшафт</h2>
            <p>Цифры — из рабочих кейсов, которые я готовил для поставок и продаж.</p>
          </div>
          <div className="tiles">
            {cases.map((item) => (
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
            <p className="kicker">Навыки</p>
            <h2 className="display">Чем пользуюсь</h2>
          </div>
          <div className="tiles tiles-compact">
            {skills.map((item) => (
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
          <p className="kicker">Образование</p>
          <div className="edu-row">
            <h2 className="display">МИСИС</h2>
            <div>
              <b>Бакалавр, материаловедение и технологии материалов</b>
              <span>Национальный исследовательский технологический университет, Москва · 2017 — 2021</span>
            </div>
          </div>
        </section>

        <section className="close" id="contact">
          <p className="giant" aria-hidden="true">ДВ</p>
          <h2>Если нужна модель, которая доезжает до системы</h2>
          <p>Москва. Открыт к релокации и удалённой работе.</p>
          <div className="close-links">
            <a className="cta" href="mailto:kitdeem@gmail.com">kitdeem@gmail.com</a>
            <a className="cta ghost-btn" href="https://t.me/kitdim" rel="noopener">Telegram @kitdim</a>
          </div>
        </section>
      </main>

      <footer className="note">
        Дмитрий Волокитин · локальная страница · октябрь 2026
      </footer>
    </>
  )
}
