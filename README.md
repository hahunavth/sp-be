## Setup:

```bash
npm install
```

## Run script: 

- Development:
  ```bash
    npm run dev
  ```
- Production:
  ```bash
      npm run start
  ```

## Change log:

- Change: route **/** using jade
- BaseURL: **/api/v1**
- Enable CORS
- Add swagger dock
- Dữ liệu dùng để test api trong **config/config.json**

## Test:
- Go to: http://localhost:8080/docs

## DB migration
https://sequelize.org/docs/v6/other-topics/migrations/#installing-the-cli
```bash
npm install --save-dev sequelize-cli
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

npx sequelize-cli db:migrate 
npx sequelize-cli seed:generate 
npx sequelize-cli init   
