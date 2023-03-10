const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

app.get("/", (req, res) => {
  res.send(" Simple node server running ...by get");
});
app.use(cors());
app.use(express.json());

// ------------------------------------------

const uri =
  "mongodb+srv://march10:cpiNo6R8sJ6v7hBS@cluster0.jkpnge1.mongodb.net/?retryWrites=true&w=majority";
// const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const userCollection = client.db("usersDB").collection("usersCollection");

    app.get("/user", async (req, res) => {
      const cursor = userCollection.find({});
      const users = await cursor.toArray();
      // console.log(users);
      res.send(users);
    });

    app.post("/user", async (req, res) => {
      const user = req.body;
      const result = userCollection.insertOne(user);
      console.log(user);
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

// ------------------------------------------

app.get("/users", (req, res) => {
  res.send(users);
});

// app.post("/user", (req, res) => {
//   console.log("post API called");
//   const user = req.body;
//   user.id = users.length + 1;
//   users.push(user);
//   res.send(user);
//   console.log(users);
// });

app.listen(port, () => {
  console.log(`Node running on port ${port} by listen`);
});
