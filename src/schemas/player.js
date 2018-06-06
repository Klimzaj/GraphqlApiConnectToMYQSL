module.exports = (buildSchema) => {
    return {
      playerSchema: buildSchema(`
        type Player {
          idp: ID
          login: String
        }
        type Query {
          player(idp: ID): [Player]
        }`
      ),
      playerQuery: `
        {
          player {
            login
          }
        }`
      }
  };