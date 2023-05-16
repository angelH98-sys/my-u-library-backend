class Error {
  source;
  field;
  message;

  constructor(source, message, field) {
    this.source = source;
    this.message = message;
    this.field = field;
  }
}

class Metadata {
  page;
  size;
  per_page;
  page_count;
  total_count;
}

class Data {
  records; //multiple
  _metadata; //metadata from multiple response

  constructor() {
    this.records = undefined;
    this._metadata = undefined;
  }
}

class MyULibraryResponse {
  status;
  data;
  errors;

  constructor() {
    this.statusCode = undefined;
    this.data = undefined;
    this.errors = undefined;
  }

  addRecord = (record) => {
    !!!this.data && (this.data = new Data());
    !!!this.data.records && (this.data.records = []);

    this.data.records = [...this.data.records, record];
  };

  addError = (source, message, field = undefined) => {
    const newError = new Error(source, message, field);

    if (!!this.errors) {
      this.errors = [...this.errors, newError];
    } else {
      this.errors = [newError];
    }
  };
}

module.exports = {
  MyULibraryResponse,
};
