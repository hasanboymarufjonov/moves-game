const crypto = require("crypto");

class KeyGenerator {
  generateKey() {
    const key = crypto.randomBytes(32).toString("hex");
    return key;
  }
}

module.exports = KeyGenerator;
