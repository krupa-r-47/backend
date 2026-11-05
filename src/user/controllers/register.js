
const { registerUser } = require("../services/auth");

async function register(request, response) {
  const user = await registerUser(request.body);

  return response.status(201).json({ user });
}

module.exports = register;