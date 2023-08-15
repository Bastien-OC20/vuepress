const express = require("express")
const router = express.Router()
const actualiteCtrl = require("../controllers/actualites")
const multer = require("../middleware/multer-config")

router.get("/", actualiteCtrl.findAllActualites)
router.get("/users/:id", actualiteCtrl.findAllActualitesForOne)
router.get("/:id", actualiteCtrl.findOneActualite)
router.post("/", multer, actualiteCtrl.createActualite)
router.put("/:id", multer, actualiteCtrl.modifyActualite)
router.delete("/:id", actualiteCtrl.deleteActualite)

module.exports = router