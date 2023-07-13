const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config()
const cors = require('cors')
// user-management
// oGwEm3VmYTVnlug2

// middleware
app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.User_Name}:${process.env.User_Password}@cluster0.ow3zltf.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const userCollection = client.db('userManagementDB').collection('users');

        // users

        // Post Method

        app.post('/postUser',async (req, res) => {
            const userData = req.body;
            if (!userData) {
                return res.status(404).send({ message: "userData not Found" })
            }
            const result= await userCollection.insertOne(userData);
            res.send(result);
        })

        // get method
      app.get('/users',async (req,res)=>{
       
        const result=await userCollection.find().toArray();
        res.send(result);

      })


    //   delete method
    app.delete('/users/:id',async(req,res)=>{
      const id=req.params.id;
      console.log(id);
      const query={_id:new ObjectId(id)};
      const result=await userCollection.deleteOne(query);
      res.send(result);

    })





        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('user management system server')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})