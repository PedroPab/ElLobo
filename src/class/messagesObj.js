const listTypes = {
  error: 'error',
  success: 'success',
  warning: 'warning',
}

class MessageObj {
  constructor() {
    this.type
    this.message
  }

  error(message) {
    this.type = listTypes.error
    this.message = message
  }
  success(message) {
    this.type = listTypes.success
    this.message = message
  }
  warning(message) {
    this.type = listTypes.warning
    this.message = message
  }
}

export default MessageObj