Audits = new Mongo.Collection('XX');

Audits.schema([windows])

WindowsSchema = DataClass.createClass({

  getRolePermissions: {
    anon: {},
    any: {},
    roleId: {
      read: true,
      write: false
    }
  },

  getSchema() {

    const heating = [
      "Fuel Type",
      "System Type",
      "System Age (Years)",
      "Efficiency",
      "Heat Set Point",
    ]

    const distribution = [
      "Duct Leakage",
      "% inside envelope",
      "Duct Insulation Value",
    ]

    return {
      "Heating 1": heating,
      "Heating 2": heating,
      "Distribution 1": distribution,
      "Distribution 2": distribution,
    };

  }

}


