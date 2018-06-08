module.exports = (buildSchema) => {
    return {
      idInfoSchema: buildSchema(`
        type IdInfo {
          idd: ID
          swordName: String
          shieldName: String
          dmg: Int
          def: Int   
          date: String
        }
        type Query {
          idInfo(idd: ID): [IdInfo]
        }`  
      ),
      idInfoQuery: `
        {
          idInfo {
            swordName
            shieldName
            dmg
            def
            date
          }
        }`
      }
  };