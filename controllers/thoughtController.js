const { User, Thought } = require('../models');

module.exports = {

    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => {
                return res.json(thoughts)
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then(thought => {
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $push: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'Thought created, but found no user with that ID'
                    })
                    : res.json('Created the thought')
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            })
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((singleThought) => {
                return res.json(singleThought);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    }, 

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((singleThought) =>
                !singleThought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(singleThought)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findByIdAndDelete(
            {_id: req.params.thoughtId}
        )
        .then((singleThought) =>
            !singleThought 
                ? res.status(400).json({message: "No thought with that ID"})
                : res.json(singleThought)
        )
        .catch((err) => res.status(500).json(err)); 
    }, 

    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought))
            .catch(err => {
                res.status(500).json(err.message)
            })

    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought))
            .catch(err => {
                res.status(500).json(err.message)
            })
    }



}