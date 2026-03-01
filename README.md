# QPP - Quasar + FastAPI Project

Современное SPA приложение с микросервисной архитектурой на Docker.

## 📋 Технологии

### Frontend
- **Vue 3** — прогрессивный JavaScript фреймворк
- **Quasar 2.18** — Vue.js фреймворк для UI
- **Pinia 2** — состояние приложения (Vuex replacement)
- **Axios** — HTTP клиент
- **TypeScript 5** — типизация
- **Vue Router 4** — роутинг (history mode)
- **Vite** — сборщик

### Backend
- **FastAPI 0.109** — современный Python фреймворк
- **SQLAlchemy 2.0** — ORM
- **AsyncPG** — асинхронный PostgreSQL драйвер
- **Pydantic 2** — валидация данных
- **Alembic** — миграции БД
- **Uvicorn** — ASGI сервер

### Infrastructure
- **Docker & Docker Compose** — контейнеризация
- **PostgreSQL 15** — база данных
- **Nginx** — reverse proxy
- **Python 3.11** — backend runtime
- **Node.js 20** — frontend runtime

## 🏗️ Структура проекта

```
qpp/
├── backend/              # FastAPI приложение
│   ├── app/
│   │   ├── api/         # API endpoints (users.py)
│   │   ├── core/        # Конфигурация (config.py)
│   │   ├── db/          # Database setup (database.py)
│   │   ├── models/      # SQLAlchemy модели (user.py)
│   │   ├── schemas/     # Pydantic схемы (user.py)
│   │   └── services/    # Бизнес логика
│   ├── tests/           # Тесты
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/            # Quasar приложение
│   ├── src/
│   │   ├── boot/       # Boot files (axios.ts)
│   │   ├── components/ # Vue компоненты
│   │   ├── layouts/    # Layouts (MainLayout.vue)
│   │   ├── pages/      # Страницы (IndexPage, UsersPage)
│   │   ├── router/     # Vue Router (routes.ts)
│   │   ├── stores/     # Pinia stores
│   │   └── css/        # Стили (quasar.variables.scss)
│   ├── public/
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   ├── package.json
│   ├── quasar.config.ts
│   └── tsconfig.json
├── nginx/              # Nginx конфигурация
│   ├── nginx.conf      # Production config (SSL ready)
│   ├── nginx-dev.conf  # Development config
│   ├── Dockerfile
│   └── Dockerfile.dev
├── postgres/           # PostgreSQL
│   ├── init/          # Init scripts (.sql)
│   └── Dockerfile
├── docker-compose.yml  # Основная конфигурация
├── .env.dev           # Development переменные
├── .env.prod          # Production переменные
└── README.md
```

## 🚀 Быстрый старт

### Требования
- Docker 20+
- Docker Compose 2.0+
- Git

### Запуск в режиме разработки

```bash
# Клонировать репозиторий
cd qpp

# Запуск всех сервисов в режиме разработки
docker compose --profile dev up --build

# Или в фоновом режиме
docker compose --profile dev up -d --build
```

**Доступ в режиме разработки:**
- **Frontend:** http://localhost:8080/ (через Nginx)
- **Frontend (dev server):** http://localhost:9000/
- **Backend API:** http://localhost:8000/
- **API Docs (Swagger):** http://localhost:8000/docs
- **API Docs (ReDoc):** http://localhost:8000/redoc
- **Health Check:** http://localhost:8080/health
- **PostgreSQL:** localhost:5432

> **Примечание:** В development режиме используется порт **8080** (не 80, так как порт 80 может быть занят).

### Запуск в режиме production

```bash
# Запуск production сборки
docker compose --profile prod up --build -d
```

**Доступ в режиме production:**
- **Сайт:** http://localhost:80/
- **API:** http://localhost:80/api/v1/
- **API Docs:** http://localhost:80/docs

## 🔧 Команды Docker Compose

```bash
# Просмотр логов всех сервисов
docker compose logs -f

# Логи конкретного сервиса
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f nginx-dev
docker compose logs -f postgres

# Остановка сервисов
docker compose down

# Остановка с удалением volumes
docker compose down -v

# Пересборка без кэша
docker compose build --no-cache

# Перезапуск сервиса
docker compose restart frontend

# Доступ в контейнер
docker compose exec backend bash
docker compose exec frontend sh
docker compose exec postgres psql -U qpp_user -d qpp_db

# Просмотр статуса
docker compose --profile dev ps
```

## 📡 API Endpoints

### Root

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | / | Приветственное сообщение |
| GET | /health | Health check |

### Users API

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | /api/v1/users | Получить список пользователей |
| POST | /api/v1/users | Создать пользователя |
| GET | /api/v1/users/{id} | Получить пользователя по ID |
| PUT | /api/v1/users/{id} | Обновить пользователя |
| DELETE | /api/v1/users/{id} | Удалить пользователя |

### API Documentation

| Endpoint | Описание |
|----------|----------|
| /docs | Swagger UI (интерактивная документация) |
| /redoc | ReDoc (красивая статичная документация) |
| /openapi.json | OpenAPI схема в формате JSON |

## 🔐 Переменные окружения

### Backend (.env / .env.dev / .env.prod)

| Переменная | Описание | По умолчанию |
|------------|----------|--------------|
| DEBUG | Режим отладки | True (dev) / False (prod) |
| APP_NAME | Имя приложения | QPP API |
| APP_VERSION | Версия приложения | 1.0.0-dev |
| POSTGRES_DB | Имя БД | qpp_db |
| POSTGRES_USER | Пользователь БД | qpp_user |
| POSTGRES_PASSWORD | Пароль БД | qpp_password (dev) / CHANGE_ME_SECURE_PASSWORD (prod) |
| POSTGRES_HOST | Хост БД | postgres |
| POSTGRES_PORT | Порт БД | 5432 |
| BACKEND_PORT | Порт backend | 8000 |
| CORS_ORIGINS | Разрешённые origin | http://localhost:9000,http://localhost:8080 |

### Frontend (quasar.config.ts)

| Настройка | Описание | Значение |
|-----------|----------|----------|
| vueRouterMode | Режим роутера | 'history' (без #) |
| devServer.port | Порт dev сервера | 9000 |
| devServer.proxy | Прокси для API | http://backend:8000 |

### Nginx

| Режим | Порт | Конфигурация |
|-------|------|--------------|
| Development | 8080 | nginx-dev.conf |
| Production | 80/443 | nginx.conf (SSL ready) |

## 🧪 Тестирование

```bash
# Backend тесты
docker compose exec backend pytest

# Frontend тесты
docker compose exec frontend npm run test

# Линтинг backend
docker compose exec backend flake8

# Линтинг frontend
docker compose exec frontend npm run lint

# Форматирование frontend
docker compose exec frontend npm run format
```

## 📝 Миграции базы данных

```bash
# Создать новую миграцию
docker compose exec backend alembic revision --autogenerate -m "migration_name"

# Применить все миграции
docker compose exec backend alembic upgrade head

# Откатить одну миграцию
docker compose exec backend alembic downgrade -1

# Откатить все миграции
docker compose exec backend alembic downgrade base

# Проверить текущую ревизию
docker compose exec backend alembic current

# Показать историю миграций
docker compose exec backend alembic history
```

## 🔒 Безопасность

### Для production:

1. **Измените пароли в `.env.prod`:**
   ```bash
   POSTGRES_PASSWORD=YOUR_SECURE_PASSWORD
   ```

2. **Настройте SSL сертификаты в Nginx:**
   - Раскомментируйте SSL директивы в `nginx/nginx.conf`
   - Поместите сертификаты в `/etc/nginx/ssl/`

3. **Обновите CORS_ORIGINS для вашего домена:**
   ```bash
   CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   ```

4. **Используйте Docker secrets для чувствительных данных**

5. **Включите HTTPS redirect в nginx.conf:**
   ```nginx
   return 301 https://$server_name$request_uri;
   ```

## 🛠️ Разработка

### Добавление нового API endpoint

1. Создайте модель в `backend/app/models/your_model.py`
2. Создайте схему в `backend/app/schemas/your_model.py`
3. Создайте роутер в `backend/app/api/your_model.py`
4. Зарегистрируйте роутер в `backend/app/main.py`
5. Создайте миграцию: `alembic revision --autogenerate -m "add_your_model"`

### Добавление новой страницы

1. Создайте компонент в `frontend/src/pages/YourPage.vue`
2. Добавьте маршрут в `frontend/src/router/routes.ts`:
   ```typescript
   { path: 'your-page', component: () => import('pages/YourPage.vue') }
   ```
3. Добавьте ссылку в меню `frontend/src/layouts/MainLayout.vue`

### Изменение темы Quasar

Отредактируйте `frontend/src/css/quasar.variables.scss`:

```scss
$primary: #1976d2;
$secondary: #26a69a;
$accent: #9c27b0;
$dark: #1d1d1d;
$positive: #21ba45;
$negative: #c10015;
$info: #31ccec;
$warning: #f2c037;
```

## 📊 Архитектура

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│    Nginx    │────▶│   Frontend  │
│  Browser    │     │  (8080/80)  │     │   (9000)    │
└─────────────┘     └──────┬──────┘     └─────────────┘
                           │
                           │     ┌─────────────┐     ┌─────────────┐
                           └────▶│   Backend   │────▶│  PostgreSQL │
                                 │   (8000)    │     │   (5432)    │
                                 └─────────────┘     └─────────────┘
```

### Network Flow

1. **Client → Nginx:** Все запросы идут через Nginx (reverse proxy)
2. **Nginx → Frontend:** Статика и SPA роутинг
3. **Nginx → Backend:** API запросы (`/api/*`, `/docs`, `/health`)
4. **Backend → PostgreSQL:** Данные приложения

## 📄 License

MIT

## 📞 Контакты

- **Репозиторий:** https://github.com/your-org/qpp
- **Документация:** http://localhost:8000/docs
