const { Collection } = require('../models');

const collectionController = {

    getAllCollections(req, res) {
        Collection.find({})
          .select('-__v')
          .then(dbCollectionData => res.json(dbCollectionData))
          .catch(err => {
              console.log(err);
              res.json(400).json(err)
          })
    },

    getCollectionById({ params }, res) {
        Collection.findOne({ _id: params.id })
          .select('-__v')
          .then(dbCollectionData => {
              if(!dbCollectionData) {
                  res.status(404).json({ message: 'No Collection found with this id' });
                  return;
              }
              res.json(dbCollectionData)
          })
          .catch(err => {
              console.log(err);
              res.status(400).json(err)
          })
    },

    createCollection({ body }, res) {
        Collection.create(body)
          .then(dbCollectionData => res.json(dbCollectionData))
          .catch(err => res.status(400).json(err))
    },

    updateCollection({ params, body }, res) {
        Collection.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbCollectionData => {
              if (!dbCollectionData) {
                  res.status(404).json({ message: "No User found with this id" });
                  return;
              }
              res.json(dbCollectionData)
          })
          .catch(err => res.status(400).json(err))
    },

    deleteCollection({ params }, res) {
        Collection.findOneAndDelete({ _id: params.id })
          .then(dbCollectionData => {
              if (!dbCollectionData) {
                  res.status(404).json({ message: 'No User found with this id' });
                  return;
              }
              res.json(dbCollectionData)
          })
          .catch(err => res.status(400).json(err))
    },


    createItem({ params, body }, res) {
        Collection.findOneAndUpdate(
            { _id: params.collectionId },
            { $push: { items: body } },
            { new: true, runValidators: true }
        )
            .then(dbItemData => {
                if (!dbItemData) {
                    res.status(404).json({ message: 'No Collection found with this id' });
                    return;
                }
                res.json(dbItemData)
            })
            .catch(err => res.status(400).json(err))
    },
}

module.exports = collectionController;