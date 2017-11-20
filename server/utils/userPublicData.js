module.exports = function (user) {
  return {
    _id: user._id,
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    picture_url: user.picture_url,
    roles: user.roles,
    provider: user.provider,
  };
};