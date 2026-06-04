const { MongoClient } = require("mongodb");

const uri =
"mongodb://admin:Admin123456@ac-sfqbp73-shard-00-00.5fxldhe.mongodb.net:27017,ac-sfqbp73-shard-00-01.5fxldhe.mongodb.net:27017,ac-sfqbp73-shard-00-02.5fxldhe.mongodb.net:27017/?replicaSet=atlas-55oqkd-shard-0&authSource=admin&retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    console.log("Conectando...");

    await client.connect();

    console.log("🟢 CONECTADO");

    await client.db("admin").command({ ping: 1 });

    console.log("🏓 PING OK");
  } catch (err) {
    console.error("🔴 ERROR:");
    console.error(err);
  } finally {
    await client.close();
  }
}

run();