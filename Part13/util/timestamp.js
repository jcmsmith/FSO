const createTimestamp = (hours = 8) => {
  const now = Date.now();
  const then = now + hours * 3600000;

  const stamp = new Date(then).toISOString();
  return stamp;
};

// Returns false if timestamp is expired
const verifyTimestamp = (stamp) => {
  // Measured in ms, so if now is greater than then, now is in the future compared to then
  const now = Date.now();
  const then = Date.parse(stamp);

  if (isNaN(then)) {
    throw new Error("Invalid timestamp");
  }

  // negative = valid, positive = invalid
  return now - then <= 0;
};

module.exports = { createTimestamp, verifyTimestamp };
