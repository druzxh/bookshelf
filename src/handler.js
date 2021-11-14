const { nanoid } = require('nanoid');
let bookshelf = require('./bookshelf');
//post
//menampilkan sring
const saveBooksHandler = (request, h) => {
        const {
          name, 
          year, 
          author, 
          summary, 
          publisher, 
          pageCount, 
          readPage, 
          reading,
        } = request.payload;
        if(!name) {
          const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
          }).code(400);
          return response;
        }
        if(readPage>pageCount) {
          const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
          }).code(400);
          return response;
        }
          //id, create, update, finished
          const id = nanoid(16)
          const insertedAt = new Date().toISOString()
          const updatedAt = insertedAt
          const finished = false
          if(pageCount === readPage) finished = true
 
        //properti name
       
  const newBooks = {
    id, name, year, author, summary, publisher, pageCount, readPage,
    finished, reading, insertedAt, updatedAt
  }
  bookshelf.push(newBooks)

  const isSuccess = bookshelf.filter((book) => book.id === id).length > 0


  if(isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    }).code(201);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  }).code(500);
  return response;
};
//get
const getAllBooksHandler = (request, h) => {
  const {name, reading, finished} = request.query;
  if (name) {
    let bookshelf = bookshelf.filter((b) => b.name.toLowerCase() === name.toLowerCase());
    return h.response({
      status: 'success',
      data: {
        books: bookshelf.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    }).code(200);
  }
  if (reading) {
    let bookshelf = bookshelf.filter((b) => Number(b.reading) === reading);
    return h.response({
      status: 'success',
      data: {
        books: bookshelf.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    }).code(200);
  }
  if (finished) {
    let bookshelf = bookshelf.filter((b) => Number(b.finished) === finished);
    return h.response({
      status: 'success',
      data: {
        books: bookshelf.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    }).code(200);
  }
  return {
    status: 'success',
    data: {
      books: bookshelf.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  }
};
 //detail

const getBooksByIdHandler = (request, h) => {
    const {bookId} = request.params;
    const book = bookshelf.filter((book) => book.id === bookId)[0];

    if (book !== undefined) {
      return {
        status: 'success',
        data: {
          book,
        },
      };
    }
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    }).code(404);
  
    return response;
  };
  //edit
const editBooksByIdHandler = (request, h) => {
    const {bookId} = request.params;
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = request.payload;
  
  

    if(!name) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      }).code(400);
      return response;
    }
    if(readPage>pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      }).code(400);
      return response;
    }
    
    const updatedAt = new Date().toISOString();
    const index = bookshelf.findIndex((b) => b.id === bookId);
  
  
    if (index !== -1) {
      bookshelf[index] = {
        ...bookshelf[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt,
      };
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      }).code(200);
  
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);
  
    return response;
  };
  //hapus
const deleteBooksByIdHandler = (request, h) => {
    const {bookId} = request.params;
    const index = bookshelf.findIndex((b) => b.id === bookId);
  
    if (index !== -1) {
      bookshelf.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      }).code(200);
  
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
  
    return response;
  };
  
module.exports = { 
  saveBooksHandler,
  getAllBooksHandler,
  getBooksByIdHandler,
  editBooksByIdHandler,
  deleteBooksByIdHandler
};