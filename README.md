# Outside-Digital
## Для развертывания:
  - создать config.json в корне
  - выполнить node app.js

## Содержание config.json
    {
      "app" : {
          "port" : Порт приложения
      },
      "auth" : {
          "secret": Private-key для JWT,
          "expires" : Время жизни JWT-токенов в секундах
      }, 
      "db": {
          "login": Логин для автоизации в бд,
          "password":Пароль для автоизации в бд,
          "host":Хост бд,
          "port": Порт бд,
          "database" : Название базы данных,
          "migrationsRequired": Требуется ли применить миграции 
      }
    }

  migrationsRequired - если БД только создана должно ьыть равно 1 для применения queries из папки migrations,
  иначе должно быть равно 0
