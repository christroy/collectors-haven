const { Collection } = require('../models')

const collectionController = {

    getAllCollections(req, res) {
        Collection.find({})
          .then(dbCollectionData => res.json(dbCollectionData))
          .catch(err => {
              console.log(err);
              res.json(400).json(err)
          })
    },

    getCollectionById({ params }, res) {
        Collection.findOne({ _id: params.id })
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
    }
}

module.exports = collectionController;