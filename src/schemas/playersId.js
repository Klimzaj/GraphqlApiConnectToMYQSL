module.exports = (buildSchema) => {
    return {
      //doczytac o tym
      playersIdSchema: buildSchema(`
        type PlayerId {
          idp: ID
          login: String
        }
        type Query {
          playersId(idp: ID): [PlayerId]
        }`
      ),
      playersIdQuery: `
        {
          playersId {
            idp
            login
          }
        }`
      }
  };