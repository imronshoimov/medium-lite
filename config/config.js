const config = {
  PORT: getConf("PORT", 8080),
};

function getConf(name, def = "") {
  if (process.env[name]) {
    return process.env[name];
  }
  return def;
}

module.exports = config;
