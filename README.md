# QPP - Quasar + FastAPI Project

Современное SPA приложение с микросервисной архитектурой на Docker.

## 📋 Технологии

### Frontend
- **Vue 3** - прогрессивный JavaScript фреймворк
- **Quasar 2** - Vue.js фреймворк для UI
- **Pinia** - состояние приложения
- **Axios** - HTTP клиент
- **TypeScript** - типизация

### Backend
- **FastAPI** - современный Python фреймворк
- **SQLAlchemy 2.0** - ORM
- **AsyncPG** - асинхронный PostgreSQL драйвер
- **Pydantic** - валидация данных
- **Alembic** - миграции БД

### Infrastructure
- **Docker & Docker Compose** - контейнеризация
- **PostgreSQL 15** - база данных
- **Nginx** - reverse proxy

## 🏗️ Структура проекта

```
qpp/
├── backend/              # FastAPI приложение
│   ├── app/
│   │   ├── api/         # API endpoints
│   │   ├── core/        # Конфигурация
│   │   ├── db/          # Database setup
│   │   ├── models/      # SQLAlchemy модели
│   │   ├── schemas/     # Pydantic схемы
│   │   └── services/    # Бизнес логика
│   ├── tests/           # Тесты
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/            # Quasar приложение
│   ├── src/
│   │   ├── boot/       # Boot files
│   │   ├── components/ # Vue компоненты
│   │   ├── layouts/    # Layouts
│   │   ├── pages/      # Страницы
│   │   ├── router/     # Vue Router
│   │   ├── stores/     # Pinia stores
│   │   └── css/        # Стили
│   ├── Dockerfile
│   └── package.json
├── nginx/              # Nginx конфигурация
│   ├── nginx.conf      # Production config
│   ├── nginx-dev.conf  # Development config
│   └── Dockerfile
├── postgres/           # PostgreSQL
│   ├── init/          # Init scripts
│   └── Dockerfile
├── docker-compose.yml
├── .env               # Environment variables
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
docker-compose --profile dev up --build

# Или в фоновом режиме
docker-compose --profile dev up -d --build
```

Доступ:
- Frontend: http://localhost:9000
- Backend API: http://localhost:8000
- API Docs (Swagger): http://localhost:8000/docs
- API Docs (ReDoc): http://localhost:8000/redoc
- PostgreSQL: localhost:5432

### Запуск в режиме production

```bash
# Запуск production сборки
docker-compose --profile prod up --build -d
```

Доступ через Nginx:
- Сайт: http://localhost:80
- API: http://localhost:80/api/v1

## 🔧 Команды Docker Compose

```bash
# Просмотр логов
docker-compose logs -f

# Логи конкретного сервиса
docker-compose logs -f backend
docker-compose logs -f frontend

# Остановка сервисов
docker-compose down

# Остановка с удалением volumes
docker-compose down -v

# Пересборка
docker-compose build --no-cache

# Запуск миграций (если есть)
docker-compose exec backend alembic upgrade head

# Доступ в контейнер
docker-compose exec backend bash
docker-compose exec frontend sh
docker-compose exec postgres psql -U qpp_user -d qpp_db
```

## 📡 API Endpoints

### Users API

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | /api/v1/users | Получить список пользователей |
| POST | /api/v1/users | Создать пользователя |
| GET | /api/v1/users/{id} | Получить пользователя по ID |
| PUT | /api/v1/users/{id} | Обновить пользователя |
| DELETE | /api/v1/users/{id} | Удалить пользователя |

### Health Check

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | /health | Проверка статуса API |

## 🔐 Переменные окружения

### Backend (.env)

| Переменная | Описание | По умолчанию |
|------------|----------|--------------|
| DEBUG | Режим отладки | True |
| POSTGRES_DB | Имя БД | qpp_db |
| POSTGRES_USER | Пользователь БД | qpp_user |
| POSTGRES_PASSWORD | Пароль БД | qpp_password |
| POSTGRES_HOST | Хост БД | postgres |
| POSTGRES_PORT | Порт БД | 5432 |
| CORS_ORIGINS | Разрешённые origin | http://localhost:9000 |

### Frontend

| Переменная | Описание | По умолчанию |
|------------|----------|--------------|
| VUE_APP_API_URL | URL API | /api/v1 |

## 🧪 Тестирование

```bash
# Backend тесты
docker-compose exec backend pytest

# Frontend тесты
docker-compose exec frontend npm run test
```

## 📝 Миграции базы данных

```bash
# Создать новую миграцию
docker-compose exec backend alembic revision --autogenerate -m "migration_name"

# Применить миграции
docker-compose exec backend alembic upgrade head

# Откатить миграцию
docker-compose exec backend alembic downgrade -1
```

## 🔒 Безопасность

### Для production:
1. Измените пароли в `.env.prod`
2. Настройте SSL сертификаты в Nginx
3. Обновите CORS_ORIGINS для вашего домена
4. Используйте secrets для чувствительных данных

## 🛠️ Разработка

### Добавление нового API endpoint

1. Создайте модель в `backend/app/models/`
2. Создайте схему в `backend/app/schemas/`
3. Создайте роутер в `backend/app/api/`
4. Зарегистрируйте роутер в `backend/app/main.py`

### Добавление новой страницы

1. Создайте компонент в `frontend/src/pages/`
2. Добавьте маршрут в `frontend/src/router/routes.ts`
3. Добавьте ссылку в меню `frontend/src/layouts/MainLayout.vue`

## 📄 License

MIT
