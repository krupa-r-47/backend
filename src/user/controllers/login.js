const { loginUser } = require("../services/auth");

async function login(request, response) {
  const user = await loginUser(request.body);

  return response.status(200).json(user);
}

module.exports = login;