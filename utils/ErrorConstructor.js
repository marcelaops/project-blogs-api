// Dica monitor Eric - para transformar em classe
// para usar: new ErrorConstructor(status, message);

class ErrorConstructor {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  } 
}

module.exports = ErrorConstructor;

// Era assim antes: module.exports = (status, message) => ({ status, message });
