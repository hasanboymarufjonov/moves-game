const crypto = require("crypto");

class HMACCalculator {
  calculateHMAC(key, move) {
    const hmac = crypto.createHmac("sha256", key);
    hmac.update(move);
    const hmacResult = hmac.digest("hex");
    return hmacResult;
  }
}

module.exports = HMACCalculator;
