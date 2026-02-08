import jwt from "jsonwebtoken"

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end()
  }

  const { email, password } = req.body

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    )

    return res.status(200).json({ token })
  }

  return res.status(401).json({ message: "Invalid credentials" })
}