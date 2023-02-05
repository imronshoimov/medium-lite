const config = {
  PORT: getConf("PORT", 8080),
  SECRET_KEY: getConf("SECRET_KEY", "privet_vsem")
};

function getConf(name, def = "") {
  if (process.env[name]) {
    return process.env[name];
  }
  return def;
}

module.exports = config;
