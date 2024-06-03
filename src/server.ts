import dotenv from "dotenv";
import app from "./app.js";
import { User } from "./models/User.js";
dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
