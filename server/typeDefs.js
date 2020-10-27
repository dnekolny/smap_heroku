const { gql } = require('apollo-server-express');

module.exports = gql`
    type Query {
        spot(_id:ID!): Spot
        spots: [Spot]
        randomCoords: [Coord]
    }

    type Spot {
        _id: ID
        name: String
        lat: Float
        lng: Float
        img: Image
        containers: [Container]
    }

    input SpotInput {
        name: String
        lat: Float
        lng: Float
        img: ImageInput
        containers: [ContainerInput]
    }

    type Image {
        data: String
        contentType: String
    }

    input ImageInput {
        data: String
        contentType: String
    }

    type Container {
        _id: ID
        contType: ContainerType
        count: Int
        probability: Float
    }

    input ContainerInput {
        contType: ContainerType
        count: Int
        probability: Float
    }

    type Coord {
        lat: Float
        lng: Float
    }

    enum ContainerType {
        PLASTIC
        COLOR_GLASS
        CLEAR_GLASS
        PAPER
        METAL
        TEXTILE
        BIO
        CARTONS
        OIL
        ELECTRO
        MIXED
    }

    type Mutation {
        createSpot(spot: SpotInput): Spot
    }
`;

// module.exports = gql`
//     type Query {
//         hello: String!
//     }
// `;