const {
    saveBooksHandler,
    getAllBooksHandler,
    getBooksByIdHandler,
    editBooksByIdHandler,
    deleteBooksByIdHandler
  } = require('./handler');

  const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: saveBooksHandler,
        options: {
        cors: {
          origin: ['*'],
        },
      },
    },
    {
        method: 'GET',
        path:  '/books',
        handler: getAllBooksHandler,
        options: {
            cors: {
              origin: ['*'],
            },
          },
      },
      {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBooksByIdHandler,
        options: {
            cors: {
              origin: ['*'],
            },
          },
      },
      {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editBooksByIdHandler,
        options: {
            cors: {
              origin: ['*'],
            },
          },
      },
      {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBooksByIdHandler,
        options: {
            cors: {
              origin: ['*'],
            },
          },
      },
  ];
   
  module.exports = routes;