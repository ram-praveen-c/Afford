const express = require("express");

const app = express();

app.use(express.json());

let claims = [];


// Customer submits claim
app.post("/claims", (req, res) => {

    const claim = {
        id: claims.length + 1,
        customer: req.body.customer,
        document: req.body.document,
        status: "Pending"
    };

    claims.push(claim);

    res.json(claim);
});


// Officer sees claims
app.get("/claims", (req, res) => {
    res.json(claims);
});


// Officer approves/rejects
app.put("/claims/:id", (req, res) => {

    let claim = claims.find(
        c => c.id == req.params.id
    );

    if (!claim) {
        return res.json({
            message: "Claim not found"
        });
    }

    claim.status = req.body.status;

    res.json(claim);
});


// Customer checks status
app.get("/claims/:id", (req, res) => {

    let claim = claims.find(
        c => c.id == req.params.id
    );

    res.json(claim);
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});