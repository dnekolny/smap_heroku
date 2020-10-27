const { MSpot, spotToGqlObject, spotsToGqlArray } = require('./models/MSpot');
const axios = require('axios').default;

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
        },
        randomCoords: async () => {
            try {
                const response = await axios.get('https://www.mapcrunch.com/_r/?c=2&d=1&i=0')
                // handle success
                var data = response.data.replace('while(1);', '');
                var points = [];

                data = JSON.parse(data);
                data.points.forEach(point => {
                    var newPoint = { lat: point[0], lng: point[1] };
                    points = [...points, newPoint];
                });

                console.log(points);
                return points;
            }
            catch (error) {
                // handle error
                console.log(error);
                return null;
            }
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