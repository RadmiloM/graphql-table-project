const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const users = [
    {
        id: '1',
        firstName: 'Rade',
        lastName: 'Jovic',
        age: 23,
        email: 'rad@yahoo.com',
        phone: '3332222'
    },
    {
        id: '2',
        firstName: 'Damir',
        lastName: 'Damic',
        age: 28,
        email: 'damir@yahoo.com',
        phone: '3332222444'
    },
    {
        id: '3',
        firstName: 'Loko',
        lastName: 'Lokic',
        age: 44,
        email: 'loko@yahoo.com',
        phone: '33344422'
    },
    {
        id: '4',
        firstName: 'Marta',
        lastName: 'Martic',
        age: 55,
        email: 'marta@yahoo.com',
        phone: '24343422'
    },
    {
        id: '5',
        firstName: 'Sasa',
        lastName: 'Sasic',
        age: 53,
        email: 'sasa@yahoo.com',
        phone: '34434'
    }
]

const schema = buildSchema(`
    # A user has a firstName, lastName, age, email, phone
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        age: Int
        email: String!
        phone: String!
    }

    type Query {
        # Get all users
        users: [User!]!
        # Get a specific user by ID
        user(id: ID!): User
        # Search user by firstName or email
        searchUsers(query: String!): [User!]!
    }
    `
)

const root = {
    users: () => users,

    user: ({id}) => users.find(user => user.id === id),

    searchUsers: ({query}) => {
        const searchTerm = query.toLowerCase();
        return users.filter(
            user => 
                user.firstName.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm)
        )
    }
}

const application = express();

application.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

const PORT = 5000;

application.listen(PORT,() => {
    console.log(`Server running at http://localhost: ${PORT}/graphql`)
})