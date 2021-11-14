const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

module.exports = secretKey = (req, res, next) => {
  let key = req.body.age;
  key = parseInt(key);
  let secret = process.env.secret || config.secret_key;

  if (secret === key) {
    next();
    return;
  }
  else {
    req.flash("error", "ERROR!!!!, INCORRECT KEY PROVIDED, Please Enter the correct key!!!");
    res.render('left-sidebar');
    return;
  }
}
