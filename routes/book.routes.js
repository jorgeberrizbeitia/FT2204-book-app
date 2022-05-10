const router = require("express").Router();

const BookModel = require("../models/Book.model.js");
const AuthorModel = require("../models/Author.model.js")

// * **** READ ****

// GET "/books" => para listar los titulos de los libros
router.get("/", (req, res, next) => {
  // busca los titulos de los libros
  BookModel.find()
    .select("title")
    .then((book) => {
      // renderiza la vista para verlos
      res.render("books/list.hbs", {
        listBook: book,
      });
    })
    .catch((err) => {
      next(err);
    });
});

// GET "/books/:id/details" => buscar los detalles de un libro por su id
router.get("/:id/details", (req, res, next) => {
  const { id } = req.params;

  // 1. buscamos los detalles del libro
  // populate se pasa el nombre de la propiedad de la que queremos la informacion completa
  BookModel.findById(id).populate("author")
    .then((book) => {
      // 2. renderizamos una vista con los detalles

      console.log(book)
      
      res.render("books/details.hbs", {
        book,
      });
    })
    .catch((err) => {
      next(err);
    });
});

// * **** CREATE ****

// GET "/books/create" => ruta para renderizar el formulario al usuario
router.get("/create", (req, res, next) => {

  AuthorModel.find().select("name")
  .then((allAuthors) => {

    res.render("books/add-form.hbs", {
      allAuthors
    });

  })
  .catch((err) => {
    next(err)
  })

});

// POST "/books/create" => recibir el libro a crear, y crearlo en la DB
router.post("/create", (req, res, next) => {
  // 1. como usamos la info para crear el elemento en la DB.

  console.log(req.body)

  // BookModel.create({
  //   title: req.body.title,
  //   description: req.body.description,
  //   author: req.body.author
  // })
  // ! abajo es lo mismo que arriba pero con destructuracion y sintaxis reducida

  const { title, description, author } = req.body;

  BookModel.create({
    author,
    title, // forma sintaxica reducida, hace lo mismo que abajo
    description: description,
  })
    .then((book) => {
      // 2. que hacemos con el usuario luego de que agrega el libro.
      // enviar al usuario a la ruta que ve la lista de libros o los detalles
      // res.redirect("/books") // enviar a lista general
      res.redirect(`/books/${book._id}/details`); // ... o enviar a detalles
    })
    .catch((err) => {
      next(err);
    });
});

// * **** EDIT ****

// GET "/books/:id/edit" => ruta que renderiza el formulario de actualizar con la informacion previa
// router.get("/:id/edit", (req, res, next) => {
//   const { id } = req.params;

//   BookModel.findById(id)
//     .then((book) => {
//       // tenemos que enviar la informacion actual de el libro
//       res.render("books/edit-form.hbs", {
//         book,
//       });
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

router.get("/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await BookModel.findById(id)

    const allAuthors = await AuthorModel.find().select("name")

    res.render("books/edit-form.hbs", {
      book,
      allAuthors
    })
  } catch(err) {
    next(err)
  }
});

// POST "/books/:id/edit" => ruta recibe los datos a actualizar el libro y lo actualiza
router.post("/:id/edit", (req, res, next) => {
  // 1. recibir la informacion a actualizar
  const { title, description, author } = req.body;
  const { id } = req.params;
  // console.log("id", id)
  console.log(req.body)

  // 2. actualizar el libro
  BookModel.findByIdAndUpdate(id, {
    title,
    description,
    author,
  })
    .then((book) => {
      // console.log("book._id", book._id)
      // book._id es lo mismo que id ??
      // 3. hacer algo con el usuario
      res.redirect(`/books/${book._id}/details`);
    })
    .catch((err) => {
      next(err);
    });
});

// * **** DELETE ****

// POST "/books/:id/delete" => borrar un libro de la DB
router.post("/:id/delete", async (req, res, next) => {
  const { id } = req.params;

  try {
    // 1. buscar el elemento y borrarlo
    await BookModel.findByIdAndDelete(id);

    // 2. hacer algo con el usuario
    res.redirect("/books");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
