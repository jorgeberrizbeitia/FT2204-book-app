const router = require("express").Router();

const BookModel = require("../models/Book.model.js")

// GET "/books" => para listar los titulos de los libros
router.get("/", (req, res, next) => {

  // busca los titulos de los libros
  BookModel.find().select("title")
  .then((book) => {
    console.log(book)
    // renderiza la vista para verlos
    res.render("books/list.hbs", {
      listBook: book
    })
  })
  .catch((err) => {
    next(err)
  })

})

// GET "/books/:id/details" => buscar los detalles de un libro por su id
router.get("/:id/details", (req, res, next) => {

  const { id } = req.params

  // 1. buscamos los detalles del libro
  BookModel.findById(id)
  .then((book) => {
    console.log(book)
    // 2. renderizamos una vista con los detalles
    res.render("books/details.hbs", {
      book
    })
  })
  .catch((err) => {
    next(err)
  })
})

// GET "/books/create" => ruta para renderizar el formulario al usuario
router.get("/create", (req, res, next) => {
  res.render("books/add-form.hbs")
})

// POST "/books/create" => recibir el libro a crear, y crearlo en la DB
router.post("/create", (req, res, next) => {
  console.log("en la ruta")
  console.log(req.body)
  // 1. como usamos la info para crear el elemento en la DB.

  // BookModel.create({
  //   title: req.body.title,
  //   description: req.body.description,
  //   author: req.body.author
  // })
  // ! abajo es lo mismo que arriba pero con destructuracion y sintaxis reducida

  const { title, description, author } = req.body

  BookModel.create({
    author,
    title, // forma sintaxica reducida, hace lo mismo que abajo
    description: description,
  })
  .then((book) => {
    // 2. que hacemos con el usuario luego de que agrega el libro.
    // enviar al usuario a la ruta que ve la lista de libros o los detalles
    // res.redirect("/books") // enviar a lista general
    res.redirect(`/books/${book._id}/details`) // ... o enviar a detalles


  })
  .catch((err) => {
    next(err)
  })



})


module.exports = router;