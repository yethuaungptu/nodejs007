var jwt = require("jsonwebtoken");

module.exports = function (req,res,next) {
  try {
    var token = req.headers.token;
    var decode = jwt.verify(token,'techapi007');
    next();
  } catch (error) {
    res.status(401).json({
      message:"You can't access before signin for this route"
    })
  }
}
