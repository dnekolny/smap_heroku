const mongoose = require('mongoose');

const SpotSchema = mongoose.Schema({
    name: String,
    lat: String,
    lng: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
    containers: [{
        contType: String,
        count: Number,
        probability: Number
    }]
});

/** transformuje mongoose object na GraphQL object
 * 
 * @param {SpotSchema} mSpot mongoose object
 * @returns {Spot} GraphQL Spot objekt
 */
const spotToGqlObject = (mSpot) => {
    if (mSpot) {
        return {
            _id: mSpot._id,
            name: mSpot.name,
            lat: mSpot.lat,
            lng: mSpot.lng,
            img: {
                data: mSpot.img.data.toString(),
                contentType: mSpot.img.contentType
            },
            containers: mSpot.containers
        }
    }
}

const spotsToGqlArray = (mSpots) => {
    if(mSpots){
        spots = [];
        mSpots.map( s => {
            spots.push(spotToGqlObject(s));
        });
        return spots;
    }
}

module.exports = {
    MSpot: mongoose.model('Spot', SpotSchema),
    spotToGqlObject,
    spotsToGqlArray
}