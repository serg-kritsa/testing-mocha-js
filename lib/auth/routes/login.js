exports.login = async (req, res) => {
  const userToLogIn = await User.findOne({ email: req.body.email });
  if (!userToLogIn) {
    return res.status(401).json({ message: 'some auth fail message' });
  } else {
    req.headers.authorization === 'foo'
  }
}