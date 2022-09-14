const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());
app.use(bodyParser());

// Read operation
app.get("/mario", async (req, res) => {
    try {
        const data = await marioModel.find();
        res.json({
            status: "Sucess",
            data
        })
    } catch (e) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
        
    }
});

// Read operation with spefic ID
app.get("/mario/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        const data = await marioModel.findOne({ _id: req.params.id });
        console.log(data);
        if (!data) {
            return res.status(400).json({
                status: "Failed",
                message: "Id is not present"
            })
        }
        res.json({
            status: "Sucess",
            data
        })
    } catch (e) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})

// create operation 
app.post("/mario", async (req, res) => {
    try {
        const data = await marioModel.create(req.body);
        res.status(201).json({
            status: "Sucess",
            data
        })
    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: "either name or weight is missing"
        })
    }
});

// delete operation 
app.delete("/mario/:id", async (req, res) => {
    try {
        const data = await marioModel.deleteOne({ _id: req.params.id });
        res.status(200).json({
            status: "Sucess",
            message: "character deleted"
        })
    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
});

// delete operation 
app.patch("/mario/:id", async (req, res) => {
    try {
        await marioModel.updateOne({ _id: req.params.id }, req.body);
        const data = await marioModel.findOne({ _id: req.params.id });
        res.status(200).json({
            status: "Sucess",
            data
        })
    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})

app.get("*", (req, res) => {
    res.status(404).json({
        status: "Failed",
        message: "API NOT FOUND"
    })
})
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here



module.exports = app;