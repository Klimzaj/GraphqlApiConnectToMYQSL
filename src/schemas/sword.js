module.exports = (buildSchema) => {
    return {
      swordSchema: buildSchema(`
        type Sword {
          idsw: ID
          name: String
          cost: Int
          dmg: Int
          date_id: Int
          dateCreate: String
        }
        type Query {
          sword(idsw: ID): [Sword]
        }`
      ),
      swordsQuery: `
        {
          sword {
            name,
            cost,
            dmg,
            dateCreate
          }
        }`
      }
  };