import { 
  Stitch,
  RemoteMongoClient,
  AnonymousCredential
} from "mongodb-stitch-browser-sdk";

const client = Stitch.initializeDefaultAppClient('sofloo-houjq');

const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('store');

client.auth.loginWithCredential(new AnonymousCredential()).then(user => 
db.collection('t-shirts').updateOne({owner_id: client.auth.user.id}, {$set:{number:42}}, {upsert:true})
).then(() => 
db.collection('t-shirts').find({owner_id: client.auth.user.id}, { limit: 100}).asArray()
).then(docs => {
  console.log("Found docs", docs)
  console.log("[MongoDB Stitch] Connected to Stitch")
}).catch(err => {
  console.error(err)
});