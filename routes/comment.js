const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const commentController = require("../controllers/comment");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now

router.post("/createComment", ensureAuth, commentController.createComment);

router.put("/likeComment/:id", ensureAuth, commentController.likeComment);

router.delete("/deleteComment/:id", ensureAuth, commentController.deleteComment);

module.exports = router;