const { MSpot, spotToGqlObject, spotsToGqlArray } = require('./models/MSpot');

//func: (parent, args, context, info) => { return... }

module.exports = {
    Query: {
        spot: (parent, args, context, info) => {
            return spots.filter(s => {
                return s._id == args._id;
            })[0]
        },
        spots: async () => {
            const spots = await MSpot.find().exec();
            return spotsToGqlArray(spots);
        }
    },
    Mutation: {
        createSpot: async (_, { spot }) => {
            const newSpot = new MSpot(spot);
            try {
                await newSpot.save();
            }
            catch (ex) {
                console.error('Chyba při ukládání SPOT!');
                console.error(ex);
            }
            const s = spotToGqlObject(newSpot);
            return s;
        }
    }
};