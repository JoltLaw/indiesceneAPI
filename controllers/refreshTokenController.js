const Account = require("../models/Account");
const jwt = require("jsonwebtoken");

// const handleRefreshToken = async (req, res) => {
//   const cookies = req.cookies;
//   if (!cookies?.jwt) return res.sendStatus(401);

//   const foundAccount = await Account.findOne({ refreshToken }).exec();

//   jwt.verify(
//     refreshToken
//   )
// };
