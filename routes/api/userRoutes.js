const router = require('express').Router(); 
const { createUser, getUsers, getSingleUser, updateUser, deleteUser, createFriend, deleteFriend } = require('../../controllers/userController'); 

router.route("/")
    .post(createUser)
    .get(getUsers)
    
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

router.route('/:userId/friends/:friendId')
    .post(createFriend)
    .delete(deleteFriend)
    
module.exports = router; 