const router = require('express').Router(); 
const { createThought, getThoughts, createReaction, deleteReaction, updateThought, deleteThought, getSingleThought } = require('../../controllers/thoughtController'); 

router.route("/")
    .post(createThought)
    .get(getThoughts)

router.route("/:thoughtId")
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)

router.route("/:thoughtId/reactions")
    .post(createReaction)
    
router.route("/:thoughtId/reactions/:reactionId")
    .delete(deleteReaction)

module.exports = router; 