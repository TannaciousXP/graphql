const graphql = require('graphql');
const _ = require('lodash');
const axios = require('axios');

const {
  GraphQLObjectType, // creates an object for GraphQL
  GraphQLString, // after defining a string in the field, you must add { type: GraphQLString}
  GraphQLInt, // after defining a int in the field, you must add { type: GraphQLInt }
  GraphQLList, // after defining a array in field, value for type key must have type: new GraphQLList(UserType)
  GraphQLSchema, // used to do module.exports = new GraphQLSchema({ query: RootQuery, mutation})
  GraphQLNonNull // for mutations you want to validate args, wrap the argument with GraphQLNonNull, args: { id: new GraphQLNonNull(GraphQLString)}
} = graphql;

// COMPANYTYPE
const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) { // parentValue, argsObject
        return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
          .then(resp => resp.data);
      }
    }
  })
});

// USER
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    // Treated as identical between graphql, underneath we could have defined CompanyType as above
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then(resp => resp.data);
      }
    }
  })
});

// Normally should always return a promise

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      // Since this is a resolve, we can fetch data from anywhere imagine
      /*
        The resolve the income model and json type to populate the different in model and db
      */
      resolve(parentValue, args) {
        // When the promise resolves, we need to use a dot then or it will be nested in the data
        return axios.get(`http://localhost:3000/users/${args.id}`)
          .then(resp => resp.data);
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${args.id}`)
          .then(res => res.data);
      }
    }
  }
});

// Mutation with GraphQL
const mutation = new GraphQLObjectType({ // all separate field added into the fields object
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType, // * not always going to be the type you will be returning
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString }
      },
      resolve(parentVal, { firstName, age }) {
        return axios.post('http://localhost:3000/users', { firstName, age })
          .then(res => res.data);
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentVal, { userId }) {
        return axios.delete(`http://localhost:3000/users/${userId}`)
          .then(res => res.data);
      }
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString }
      },
      resolve(parentVal, {
        id, // JSON server: doesn't update ids
        firstName,
        age,
        companyId
      }) {
        return axios.patch(`http://localhost:3000/users/${id}`, { firstName, age, companyId })
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
// const graphql = require('graphql');
// const axios = require('axios');
// const {
//   GraphQLObjectType,
//   GraphQLString,
//   GraphQLInt,
//   GraphQLSchema,
//   GraphQLList,
//   GraphQLNonNull
// } = graphql;

// const CompanyType = new GraphQLObjectType({
//   name: 'Company',
//   fields: () => ({
//     id: { type: GraphQLString },
//     name: { type: GraphQLString },
//     description: { type: GraphQLString },
//     users: {
//       type: new GraphQLList(UserType),
//       resolve(parentValue, args) {
//         return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
//           .then(res => res.data)
//       }
//     }
//   })
// });

// const UserType = new GraphQLObjectType({
//   name: 'User',
//   fields: () => ({
//     id: { type: GraphQLString },
//     firstName: { type: GraphQLString },
//     age: { type: GraphQLInt },
//     company: {
//       type: CompanyType,
//       resolve(parentValue, args) {
//         return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
//           .then(res => res.data);
//       }
//     }
//   })
// });

// const RootQuery = new GraphQLObjectType({
//   name: 'RootQueryType',
//   fields: {
//     user: {
//       type: UserType,
//       args: { id: { type: GraphQLString } },
//       resolve(parentValue, args) {
//         return axios.get(`http://localhost:3000/users/${args.id}`)
//           .then(resp => resp.data);
//       }
//     },
//     company: {
//       type: CompanyType,
//       args: { id: { type: GraphQLString } },
//       resolve(parentValue, args) {
//         return axios.get(`http://localhost:3000/companies/${args.id}`)
//           .then(resp => resp.data);
//       }
//     }
//   }
// });

// const mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {
//     addUser: {
//       type: UserType,
//       args: {
//         firstName: { type: new GraphQLNonNull(GraphQLString) },
//         age: { type: GraphQLInt },
//         companyId: { type: GraphQLString }
//       },
//       resolve(parentValue, { firstName, age, companyId }) {
//         return axios.post('http://localhost:3000/users', { firstName, age, companyId })
//           .then(res => res.data);
//       }
//     },
//     deleteUser: {
//       type: UserType,
//       args: {
//         id: { type: new GraphQLNonNull(GraphQLString) }
//       },
//       resolve(parentValue, { id }) {
//         return axios.delete(`http://localhost:3000/users/${id}`)
//           .then(res => res.data);
//       }
//     }
//   }
// });

// module.exports = new GraphQLSchema({
//   mutation,
//   query: RootQuery
// });
