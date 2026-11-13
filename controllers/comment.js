const cloudinary = require("../middleware/cloudinary");
const Comment = require("../models/Comment");

module.exports = {
    createComment: async (req, res) => {
        try {
            // Upload image to cloudinary
            // const result = await cloudinary.uploader.upload(req.file.path);

            await Comment.create({
                // cloudinaryId: result.public_id,
                comment: req.body.comment,
                likes: 0,
                user: req.user.id,
                post: req.body.postId,
                // timePosted: req.body.createdAt
            });
            console.log("Comment has been added!");
            res.redirect(`/post/${req.body.postId}`);
        } catch (err) {
            console.log(err);
            res.redirect(`/post/${req.body.postId}`);
        }
    },
    likeComment: async (req, res) => {
        try {
            let comment = await Comment.findById(req.params.id)
            if (!comment) {
                return res.redirect("/feed")
            }
            await Comment.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $inc: { likes: 1 },
                }
            );
            console.log("Likes +1");
            res.redirect(`/post/${comment.post}`);
        } catch (err) {
            console.log(err)
            res.redirect("/feed");
        }
    },
    deleteComment: async (req, res) => {
        try {
            // Find post by id
            let comment = await Comment.findById({ _id: req.params.id });
            if (!comment) {
                return res.redirect("/feed")
            }
            // Delete post from db
            await Comment.remove({ _id: req.params.id });
            console.log("Deleted Comment");
            res.redirect(`/post/${comment.post}`);
        } catch (err) {
            res.redirect("/feed");
        }
    },
};
