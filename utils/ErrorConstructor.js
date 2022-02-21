class ErrorConstructor {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  } 
}

module.exports = ErrorConstructor;

// Ajuda monitor Eric
// para usar: new ErrorConstructor(status, message);

// module.exports = (status, message) => ({ status, message });
