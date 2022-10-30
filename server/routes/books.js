// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    
    res.render('books/details', {title: 'test', books: book});

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    //  Load values using Book Schema Model
    let newBook = book({
      "Title": req.body.title,
      //"Description": req.body.description,
      "Price": req.body.price, 
      "Author": req.body.author, 
      "Genre": req.body.genre
    });

    //  Creating new book entry using schema
    book.create(newBook, (err, book) => {
      //  If there is an error, end the response.
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
        //  Redirect into Books Page
        res.redirect('/books');
      }
    })

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    //  Get unique datbase id
    let id = req.params.id;

    //  Find data by unique id
    book.findById(id, (err, bookToEdit) => {
      //  If there is an error, end the response.
      if(err){
        console.log(err);
        res.end(err);
      }
      else{
        //  Show details from Views and Send the Found Database Entry
        res.render('books/details', {title: 'Edit Existing User', books: bookToEdit});
      }
    });  
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    //  Get unique datbase id
    let id = req.params.id;
    
    //  Take input and update fields into the books database entry by unique id
    let updatedBook = books({
      "_id": id,
      "Title": req.body.title,
      "Description": req.body.description,
      "Price": req.body.price, 
      "Author": req.body.author, 
      "Genre": req.body.genre
    });

    //  Update the database with the new entry by unique id
    book.updateOne({_id: id}, updatedBook, (err) => {
      //  If there is an error, end the response.
      if(err){
        console.log(err);
        res.end(err);
      }
      else{
        //  Redirected to Books Main Page
        res.redirect('/books')
      }
    });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    
    //  Get unique datbase id
    let id = req.params.id;
    
    //  Remove Book by ID
    book.remove({_id: id}, (err) => {
      //  If there is an error, end the response.
      if(err){
        console.log(err);
        res.end(err);
      }
      else{
        //  Redirect into Books
        res.redirect('/books');
      }
    })
});


module.exports = router;
