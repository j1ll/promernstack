const {MongoClient} = require('mongodb');
const opts = { validator: { $jsonSchema: {
      bsonType: "object",
      required: [ "_id", "status", "owner", "created", "title"],
      properties: {
        created:{bsonType: 'date'},
      }
    }}};

const issues = [
  {
    status: 'Open',
    owner: 'Ravan',
    created: new Date('2016-08-15'),
    effort: 5,
    completionDate: undefined,
    title: 'Error in console when clicking Add',
  },
  {
    status: 'Assigned',
    owner: 'Eddie',
    created: new Date('2016-08-16'),
    effort: 14,
    completionDate: new Date('2016-08-30'),
    title: 'Missing bottom border on panel',
  },
];
async function ccc(){
  const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
  const db=client.db('issuetracker');
  await db.collection('issues').drop();
  const collection = await db.createCollection('issues',opts);
  await collection.insertMany(issues);
  await collection.createIndex({ status: 1 });
  await collection.createIndex({ owner: 1 });
  await collection.createIndex({ created: 1 });
  client.close();
}

ccc().catch(err=>console.error('ERROR ', err));