const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
          },
          password: {
            type: String,
            required: true,
            minLength: 5,
          },
    }
);

const User = mongoose.model("User", schema);

module.exports = User;