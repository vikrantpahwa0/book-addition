const express = require("express");
const { Sequelize } = require("sequelize");
const db = require("./models");
const authRoutes = require("./routes/auth-routes");
const bookRoutes = require("./routes/book-routes");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
}));

// Test Database Connection
db.sequelize.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.error("DB connection error:", err));

  // (async () => {
  //   try {
  //     await db.sequelize.sync({ force: false }); // Change to { force: true } to recreate tables
  //     console.log('Database & tables synced successfully!');
  //   } catch (error) {
  //     console.error('Error syncing database:', error);
  //   }
  // })();

// Sample Route
app.get("/", (req, res) => res.send("Welcome to Sequelize App!"));
app.use("/auth", authRoutes);
app.use("/book", bookRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
