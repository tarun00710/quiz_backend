const jwt = require("jsonwebtoken");

const secret =
  "efuhpBjqkzx2zE84IoqSVwzNakAL0McwYDMrkxVfkAyoyt0Cf9rjDwVFvwwmCYWh55ciD7HYPU5EC4cYxWMDhrZ5cnLBMgJrFBDHLzAW3ReYrQsLUd2qr6picKFl5oHxybeJU8RJRSKm8qY9ZC5NXNCZGOVSS8qAju2kQLwA9haBEWgD17QZOxbU/WY1qVM1xUfYzBIzs76oEq7x4gku6PLsnAW9oMfml0wPB2aQKIxWZjso5iWvDswLiorDnfv9hUMgjcZ5Dm4V1ciMkfu+zMrfNyRkdQZHao/aW0Zkz2hvaueAhx+n/lFZuMi0yhyOlXmHom8W3H4YhPlUztyyIw==";

const authVerify = async (req, res,next) => {
  try {
    const token = req.body.headers.authorization;
    // console.log(req.body.headers.authorization)
    const decoded = jwt.verify(token, secret);
    req.user = { userId : decoded.userId}
    return next();
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {authVerify}
