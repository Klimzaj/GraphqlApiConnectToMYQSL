module.exports = (buildSchema) => {
    return {
      playerSchema: buildSchema(`
        type Player {
          idp: ID
          login: String
          coin: Int

        }
        type Query {
          player(idp: ID): [Player]
        }`
      ),
      playerQuery: `
        {
          player {
            login
            coin
          }
        }`
      }
  };