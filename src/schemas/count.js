module.exports = (buildSchema) => {
    return {
      countSchema: buildSchema(`
        type Count {
          ej: Int
        }
        type Query {
          counter(idg: ID): [Count]
        }`  
      ),
      countQuery: `
        {
          counter {
            ej
          }
        }`
      }
  };