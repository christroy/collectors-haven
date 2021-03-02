const router = require('express').Router()

const {
    getAllCollections,
    getCollectionById,
    createCollection,
    updateCollection,
    deleteCollection,
    createItem
} = require('../../controllers/collection-controller');

// GET & POST under /api/collections
router 
    .route('/')
    .get(getAllCollections)
    .post(createCollection);

router
    .route('/:collectionId').post(createItem);


router 
    .route('/:id')
    .get(getCollectionById)
    .put(updateCollection)
    .delete(deleteCollection);

module.exports = router;

