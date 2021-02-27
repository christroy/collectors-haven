const router = require('express').Router()

const {
    getAllCollections,
    getCollectionById,
    createCollection,
    updateCollection,
    deleteCollection
} = require('../../controllers/collection-controller');
const userController = require('../../controllers/user-controller');

// GET & POST under /api/collections
router 
    .route('/')
    .get(getAllCollections)
    .post(createCollection);


router 
    .route('/:id')
    .get(getCollectionById)
    .put(updateCollection)
    .delete(deleteCollection);

module.exports = router;

