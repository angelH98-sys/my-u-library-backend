const { userStore } = require("../config/user.store");

const AuditorySchemaOptions = {
  createdBy: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  lastModifier: {
    type: String,
  },
  lastModified: {
    type: Date,
  },
};

const setAuditorySchemaCreationOptions = (model) => {
  model.createdBy = userStore.getState().uid;
  model.createdAt = new Date();

  return model;
};

module.exports = { AuditorySchemaOptions, setAuditorySchemaCreationOptions };
