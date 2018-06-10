module.exports = (buildSchema) => {
    return {
      shoppingSchema: buildSchema(`
        type Shopping {
          ids: ID
          sw_id: Int
          sh_id: Int
        }
        type Query {
          shopping(ids: ID): [Shopping]
        }`
      ),
      shoppingQuery: `
        {
          shopping {
            sh_id    
            sw_id
          }
        }`
      }
  };