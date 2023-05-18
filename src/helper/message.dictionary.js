const MessageDictionary = {
  ERROR: {
    FIREBASE: {
      TOKEN: {
        EXPIRED: "error.firebase.token.expired",
        INVALID: "error.firebase.token.invalid",
        REQUIRED: "client.error.firebase.token.required",
      },
    },
    FORM: {
      FIELD: {
        REQUIRED: "error.general.field.required",
        INVALID: "error.general.field.invalid",
        FORMAT: "error.general.field.format",
      },
    },
    USER: {
      EMAIL: {
        UNAVAILABLE: "error.user.email.unavailable",
      },
    },
    BOOK: {
      STOCK: {
        MINIMUM: "error.book.stock.minimum",
      },
      YEAR: {
        INVALID: "error.book.year.invalid",
      },
    },
    UNHANDLED: "error.unhandled",
    UNAUTHORIZED: "error.unauthorized",
    PARAM: {
      ID: {
        NOT_FOUND: "error.general.element.not_found",
      },
    },
    CHECKOUT: {
      BOOK_ID: {
        INVALID: "error.checkout.book.invalid",
        NOT_FOUND: "error.checkout.book.not_found",
        OUT_OF_STOCK: "error.checkout.book.outOfStock",
      },
    },
  },
};

module.exports = {
  MessageDictionary,
};
