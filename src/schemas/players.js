module.exports = (buildSchema) => {
    return {
      playersSchema: buildSchema(`
        type Player {
          idp: ID
          login: String
        }
        type Query {
          players(idp: ID): [Player]
        }`
      ),
      playersQuery: `
        {
          players {
            login
          }
        }`
      }
  };