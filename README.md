# Structure programming backend SP_17

[![Fly Deploy](https://github.com/hahunavth/sp-be/actions/workflows/fly.yml/badge.svg)](https://github.com/hahunavth/sp-be/actions/workflows/fly.yml)
[![DeepSource](https://deepsource.io/gh/hahunavth/sp-be.svg/?label=active+issues&show_trend=true&token=97t8NqhWzrn9KdmWLvxuowG0)](https://deepsource.io/gh/hahunavth/sp-be/?ref=repository-badge)
[![DeepSource](https://deepsource.io/gh/hahunavth/sp-be.svg/?label=resolved+issues&show_trend=true&token=97t8NqhWzrn9KdmWLvxuowG0)](https://deepsource.io/gh/hahunavth/sp-be/?ref=repository-badge)

- Project này sử dụng framework Express js
- Trong project có áp dụng Service Repository Pattern. Chi tiết ở phần Project structure.

## Project structure:

```shell
.
├── db_migration.md
├── docker-compose.yml
├── docker-entrypoint.sh
├── Dockerfile
├── ecosystem.config.js
├── fly.toml
├── nginx.conf
├── package.json
├── .env                # File định nghĩa biến môi trường
├── dist                # Thư mục chứa file js được build từ ts
├── src
│   ├── app.ts
│   ├── config          # Chứa các file dùng để load config, env
│   ├── controllers     # Chứa các controllers
│   ├── databases       # Script kết nối DB
│   ├── dtos            # Chứa các data transfer object (dtos)
│   ├── exceptions      #
│   ├── http            #
│   ├── interfaces      #
│   ├── middlewares     # Định nghĩa các middleware
│   ├── migrations      #
│   ├── models          # Định nghĩa schema cho db
│   ├── routes          # Map các route tới controller tương ứng
│   ├── seeders         # Seed db
│   ├── server.ts       #
│   ├── services        # Business logic
│   ├── tests           # test
│   └── utils           #
└── tsconfig.json
```

## Setup
### Config .env

```
# PORT
PORT = 3000

# DATABASE
DB_HOST = sp-17-production-db.fly.dev
DB_PORT = 5432
DB_USER = postgres
DB_PASSWORD = lvI5yXgQkZFfkVq
DB_DATABASE = sp_17_production_v2
# DIALECT=postgres

# TOKEN
SECRET_KEY = secretKey

# LOG
LOG_FORMAT = dev
LOG_DIR = ../logs

# CORS
ORIGIN = *
CREDENTIALS = true
```

### Install libraries

Sử dụng lệnh `npm install`

### Run

Chạy trên môi trường development sử dụng lệnh `npm dev`
<br>
Chạy production dùng lệnh `npm start`


## Hướng dẫn tester
<p>Dựa theo link postman bên dưới, vào phần Version 1. Sửa BaseURL giống như link bên dưới để test. Sau đó đối chiếu kết quả trả về với kết quả ghi trong Link API Doc. Có thể thử các trường hợp vi phạm để bắt các lỗi không hợp lệ.</p>


## Link tài liệu
<ul>
  <li><a href="https://husteduvn.sharepoint.com/:x:/s/IT44922022I-CGiang/EY666IL81J1HtFxlS2VlZRUB4jN1OfpGH_LN2Tg2Gj_5pQ?e=vp5ZuN">Link API Doc</a></li>
  <li><a href="https://www.postman.com/lunar-star-420883/workspace/sp-17/overview">Link Postman</a></li>
  <li>BaseURL: <a href="https://sp-17-production.fly.dev/api/v1">https://sp-17-production.fly.dev/api/v1</a></li>
</ul>
