module.exports = (buildSchema) => {
    return {
      shieldSchema: buildSchema(`
        type Shield {
          idsh: ID
          name: String
          cost: Int
          def: Int
          date_id: Int
          dateCreate: String
        }
        type Query {
          shields(idsh: ID): [Shield]
        }`
      ),
      shieldQuery: `
        {
          shields {
            name,
            cost,
            def,
            dateCreate
          }
        }`
      }
  };