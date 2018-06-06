module.exports = (buildSchema) => {
    return {
      swordsSchema: buildSchema(`
        type Sword {
          idsw: ID
          name: String
          cost: Int
          dmg: Int
          date_id: Int
        }
        type Query {
          swords(idsw: ID): [Sword]
        }`
      ),
      swordsQuery: `
        {
          swords {
            name,
            cost,
            dmg
          }
        }`
      }
  };