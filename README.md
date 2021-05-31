# E-learning

mbuh.

## Installation

Copy ke file .env

```bash
PORT = 3000

DB_USER = (user)
DB_PASSWORD = (password)
DB_NAME = (nama database)
NODE_ENV = development
DB_HOST = 127.0.0.1
DB_DIALECT = postgres
```

Use the package manager [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to install foobar.

```bash
npm install
```

atau

```bash
yarn install
```

## Create Dabatabse

```bash
npx sequelize-cli db:create
```

atau

```bash
yarn sequelize-cli db:create
```

## Migration Table

```bash
npx sequelize-cli db:migrate
```

atau

```bash
yarn sequelize-cli db:migrate
```

## Design Database

design database [disini](https://dbdiagram.io/d/608a296bb29a09603d129f58)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
