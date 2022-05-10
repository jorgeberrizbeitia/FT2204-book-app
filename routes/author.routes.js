const router = require("express").Router();

const AuthorModel = require("../models/Author.model.js")
// iran todas nuestras rutas de Autores

// * CREATE
// GET "/author/create" => renderizar al usuario un formulario para crear autores
router.get("/create", (req, res, next) => {

  res.render("authors/create.hbs")

})

// POST "/authors/create" => crea el elemento de autor nuevo
router.post("/create", (req, res, next) => {

  console.log("probando ruta")
  console.log(req.body)
  const { name, country, yearBorn } = req.body

  AuthorModel.create({
    name,
    country,
    yearBorn
  })
  .then((response) => {
    res.redirect("/")
  })
  .catch((err) => {
    next(err)
  })

})


// * READ
// GET "/authors" => buscar todos los autores
router.get("/", (req, res, next) => {

  AuthorModel.find()
  .then((allAuthors) => {

    res.render("authors/list.hbs", {
      allAuthors
    })

  })
  .catch((err) => {
    next(err)
  })

})


// * UPDATE


// * DELETE



module.exports = router;