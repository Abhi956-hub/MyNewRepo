  
const mongoose = require("mongoose");

const BusinessSchema =new mongoose.Schema({
  contact_name: {
    type: String
  },
  contact_number: {
    type: String
  },
  email_address: {
    type: String
  }
});

// export model user with UserSchema
module.exports = mongoose.model("Businesslist", BusinessSchema);