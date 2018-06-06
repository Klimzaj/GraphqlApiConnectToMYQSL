module.exports = (buildSchema) => {
    return {
      shieldsSchema: buildSchema(`
        type Shield {
          idsh: ID
          name: String
          cost: Int
          def: Int
          date_id: Int
        }
        type Query {
          shields(idsh: ID): [Shield]
        }`
      ),
      shieldsQuery: `
        {
          shields {
            name,
            cost,
            def
          }
        }`
      }
  };