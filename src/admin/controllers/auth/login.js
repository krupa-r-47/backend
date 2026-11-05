const { loginAdmin } = require("../../services/auth");

async function login(request, response) {
  const admin = await loginAdmin(request.body);

  return response.status(200).json(admin);
}

module.exports = login;
