require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());


const questionRoutes = require("./routes/questionRoutes");
const reportRoutes = require("./routes/reportRoutes");

// START SERVER ONLY AFTER DB CONNECTS
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    // routes
    app.use("/", authRoutes);
    

    app.use("/api/questions", questionRoutes);
    app.use("/api/reports", reportRoutes);


    const auth = require("./middleware/auth");
    app.get("/api/protected", auth, (req, res) => {
      res.json({ msg: "This is protected", userId: req.user });
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();
