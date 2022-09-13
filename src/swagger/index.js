const dotenv = require('dotenv');
const { join } = require('path');
// const { fileURLToPath } = require('url');
const swaggerAutogen = require('swagger-autogen');

// const _dirname = dirname(fileURLToPath(import.meta.url));
// const _dirname = dirname(fileURLToPath(__dirname));
const _dirname = __dirname;

dotenv.config();
const { 
  PORT = 3005,
} = process.env;

const doc = {
  // общая информация
  info: {
    title: 'Books API',
    description: 'Books API. SkyPro Node.js Coursework'
  },
  definitions: {
    // модель пользователя
    User: {
      _id: '1',
      username: 'james',
      name: 'James',
      surname: 'Fern'
    },
    // модель списка пользователей
    Users: [
      {
        // ссылка на модель пользователя
        $ref: '#/definitions/User'
      }
    ],
    // модель объекта с новым пользвателем
    NewUser: {
      username: 'james',
      name: 'James',
      surname: 'Fern'
    },
    Book: {
      _id: '1',
      title: 'War and Peace',
      author: 'L.Tolstoy',
      release_year: '1867'
    },
    // модель списка книг
    Books: [
      {
        // ссылка на модель книги
        $ref: '#/definitions/Books'
      }
    ],
    // модель объекта с новой книгой
    NewBook: {
      title: 'War and Peace',
      author: 'L.Tolstoy',
      release_year: '1867'
    },
    // модель ответа при удалении записи  
    DeletedInfo: {
      acknowledged: true,
      deletedCount: 1
    },
  },
  host: `localhost:${PORT}`,
  schemes: ['http']
  }

// путь и название генерируемого файла
const outputFile = join(_dirname, 'output.json')
// массив путей к роутерам
const endpointsFiles = [join(_dirname, '../app.js')]

swaggerAutogen(/*options*/)(outputFile, endpointsFiles, doc).then(({ success }) => {
 console.log(`Generated: ${success}`)
});
