import jwt from "jsonwebtoken"; // .header.payload.hasedSignature(header + payload + secret)

export function signJWT(username: string, expiresIn: string) {
  return jwt.sign({ username: username }, process.env.JWT_SECRET, {
    algorithm: "RS256",
    expiresIn,
  });
}

export function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_PUBLIC);
  } catch (e) {
    return { payload: null, expiresIn: e.message.include("jwt expired") };
  }
}
