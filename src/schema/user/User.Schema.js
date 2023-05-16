const { Schema, model } = require("mongoose");

const {
  MessageDictionary: { ERROR },
} = require("../../helper/message.dictionary");
const {
  AuditorySchemaOptions,
} = require("../../helper/auditory.schema.options");

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, ERROR.FORM.FIELD.REQUIRED],
  },
  lastName: {
    type: String,
    required: [true, ERROR.FORM.FIELD.REQUIRED],
  },
  email: {
    type: String,
    required: [true, ERROR.FORM.FIELD.REQUIRED],
    validate: [
      {
        validator: (email) => {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
        },
        message: ERROR.FORM.FIELD.FORMAT,
      },
      {
        validator: async (email) => {
          return !!!(await model("user").exists({ email }));
        },
        message: ERROR.USER.EMAIL.UNAVAILABLE,
      },
    ],
  },
  role: {
    type: String,
    required: [true, ERROR.FORM.FIELD.REQUIRED],
    validate: {
      validator: (role) => {
        const roleCodes = process.env.USER_ROLE_CODES.split(",");
        return roleCodes.includes(role);
      },
      message: ERROR.FORM.FIELD.INVALID,
    },
  },
  firebaseId: {
    type: String,
  },
  ...AuditorySchemaOptions,
});

module.exports = model("user", UserSchema);
