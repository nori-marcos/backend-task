import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true, // note - this is a unqiue index - not a validation
    validate: {
      validator: function (value) {
        const self = this;
        const errorMsg = 'Email already in use!';
        return new Promise((resolve, reject) => {
          self.constructor
            .findOne({ email: value })
            .then((model) =>
              model._id ? reject(new Error(errorMsg)) : resolve(true),
            ) // if _id found then email already in use
            .catch((err) => resolve(true)); // make sure to check for db errors here
        });
      },
    },
  },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  avatar: { type: String, required: true },
});
