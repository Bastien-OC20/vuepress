const express = require("express")
const router = express.Router()
const eventCtrl = require("../controllers/events")
const multer = require("../middleware/multer-config")

router.get("/", eventCtrl.findAllEvents)
router.get("/users/:id", eventCtrl.findAllEventsForOne)
router.get("/:id", eventCtrl.findOneEvent)
router.post("/", multer, eventCtrl.createEvent)
router.put("/:id", multer, eventCtrl.modifyEvent)
router.delete("/:id", eventCtrl.deleteEvent)

module.exports = router