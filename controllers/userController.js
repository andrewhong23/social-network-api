const { User, Thought } = require('../models');

module.exports = {

    // get all users
    getUsers(req, res) {
        User.find()
            .then((users) => {
                return res.json(users);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    createUser(req, res) {
        User.create(req.body)
            .then(dbRes => {
                return res.json(dbRes)
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((singleUser) => {
                return res.json(singleUser);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((singleUser) =>
                !singleUser
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(singleUser)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((singleUser) =>
                !singleUser
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(singleUser)
            
            )
            .catch(err => {
                res.status(500).json(err)
            }) 
    },

    createFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user))
            .catch(err => {
                res.status(500).json(err)
            })
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user))
            .catch(err => {
                res.status(500).json(err)
            })
    }

};




