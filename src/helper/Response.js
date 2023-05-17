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
  page_size;
  total_count;
  left;

  constructor(limit, skip, total) {
    this.total_count = total;
    this.page_size = limit;

    const left = total - skip - limit;

    this.left = left <= 0 ? 0 : left;
  }
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

  setMetadata = (limit, skip, total) => {
    !!!this.data && (this.data = new Data());
    !!!this.data._metadata &&
      (this.data._metadata = new Metadata(limit, skip, total));
  };
}

module.exports = {
  MyULibraryResponse,
};
