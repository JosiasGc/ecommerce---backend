import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, "secreto123", {
    expiresIn: "30d",
  });
};

export default generateToken;
