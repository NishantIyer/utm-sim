const express = require('express');
const axios = require('axios');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Example intrusion data with the name "nikhil"
const exampleIntrusionData = {
  // ... (your example intrusion data here)
};

// Endpoint to simulate posting an intrusion attack to the API
app.post('/post-intrusion', async (req, res) => {
  try {
    // Replace 'API_URL' with the actual API URL
    const apiUrl = 'https://uml-api.vercel.app/api/scanResults';

    // Update the name to "nikhil"
    const intrusionData = {
      ...exampleIntrusionData,
       // Add the "name" field with the value "nikhil"
    };

    // Post the intrusion data to the API
    await axios.post(apiUrl, intrusionData);

    res.json({ message: 'Intrusion attack posted successfully' });
  } catch (error) {
    console.error('Error posting intrusion attack:', error.message);
    res.status(500).json({ error: 'Failed to post intrusion attack' });
  }
});

// Endpoint to delete all data from MongoDB collection
app.delete('/delete-data', async (req, res) => {
  const connectionString = 'mongodb+srv://offsecnish2609:offmongo@cluster0.wwxsx22.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection string
  const databaseName = 'test'; // Replace with your database name
  const collectionName = 'scanresults'; // Replace with your collection name

  try {
    const client = await MongoClient.connect(connectionString);
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    // Delete all documents in the collection
    await collection.deleteMany({});

    console.log('All data in the collection deleted successfully.');

    client.close(); // Close the MongoDB client

    res.json({ message: 'Data deleted successfully' });
  } catch (error) {
    console.error('Error deleting data:', error.message);
    res.status(500).json({ error: 'Failed to delete data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
