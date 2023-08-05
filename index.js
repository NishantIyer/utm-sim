const express = require('express');
const axios = require('axios');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;


const exampleIntrusionData = {
  
};

app.post('/post-intrusion', async (req, res) => {
  try {
    const apiUrl = 'https://uml-api.vercel.app/api/scanResults';

    const intrusionData = {
      ...exampleIntrusionData,
    };

    await axios.post(apiUrl, intrusionData);

    res.json({ message: 'Intrusion attack posted successfully' });
  } catch (error) {
    console.error('Error posting intrusion attack:', error.message);
    res.status(500).json({ error: 'Failed to post intrusion attack' });
  }
});

app.delete('/delete-data', async (req, res) => {
  const connectionString = ''; // Replace with your MongoDB connection string
  const databaseName = 'test'; 
  const collectionName = 'scanresults'; 

  try {
    const client = await MongoClient.connect(connectionString);
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    
    await collection.deleteMany({});

    console.log('All data in the collection deleted successfully.');

    client.close(); 

    res.json({ message: 'Data deleted successfully' });
  } catch (error) {
    console.error('Error deleting data:', error.message);
    res.status(500).json({ error: 'Failed to delete data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
