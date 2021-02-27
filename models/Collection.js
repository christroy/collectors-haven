const { Schema, model } = require('mongoose');

const ItemSchema = new Schema (
    {
        name: {
            type: String,
            required: 'Please enter a Name for the Item',
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        condition: {
            type: String,
            trim: true
        },
        priceBought: {
            type: Number
        }
    }
);

    // collection references User, and has items embedded
const CollectionSchema = new Schema (
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        items: ItemSchema
    }
);

const Collection = model('Collection', CollectionSchema);

module.exports = Collection; 