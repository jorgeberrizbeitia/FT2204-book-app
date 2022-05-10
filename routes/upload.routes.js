const router = require("express").Router();

const uploader = require("../middlewares/uploader")
const BookModel = require("../models/Book.model")

// POST "/upload/book-cover/:id" => ruta que sube una imagen de cubierta de libro
router.post("/book-cover/:id", uploader.single("image"), (req, res, next) => {
  // "image" tiene que ser igual al name del input donde se sube la imagen

  console.log("intentando enviar imagen")
  console.log("el archivo recibido de cloudinary", req.file)
  // aqui es donde vamos a usar el paquete de cloudinary

  const { id } = req.params

  BookModel.findByIdAndUpdate(id, {
    cover: req.file.path
  })
  .then((response) => {
    res.redirect(`/books/${id}/details`)
  })
  .catch((err) => {
    next(err)
  })

})


module.exports = router;