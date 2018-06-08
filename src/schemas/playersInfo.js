module.exports = (buildSchema) => {
    return {
      playersInfoSchema: buildSchema(`
        type PlayersInfo {
          idd: ID
          p_id: Int
          sw_id: Int
          sh_id: Int
          date_id: Int
          coin: Int
          login: String
        }
        type Query {
          playersInfo(idd: ID): [PlayersInfo]
        }`  
      ),
      playersInfoQuery: `
        {
          playersInfo {
            login
            p_id
            coin
            sw_id
            sh_id
            date_id
          }
        }`
      }
  };