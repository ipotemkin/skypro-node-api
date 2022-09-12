const router = require('express').Router();
const {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
   } = require('../views/users');

router.get('/', getUsers);

router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
