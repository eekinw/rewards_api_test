const express = require('express');
const app = express();
const port = 3002;

const rewards = [
    {
        id: 1,
        name: "SUPA Shirt",
        points: 50,
        quantity: 100,
        category: "Clothing",
        description: "Limited edition company shirt"
    }, 
    {
        id: 2,
        name: "Cap",
        points: 10,
        quantity: 10,
        category: "Merchandise",
        description: "Not a cap"
    }
]

app.use(express.json());

// req: client to server
// res: server back to client


// GET
app.get('/rewards', (req, res) => {
    res.send(rewards)
})


// POST
app.post('/rewards', (req, res) => {
    const reward = {
        id: rewards.length + 1,
        name: req.body.name,
        points: req.body.points,
        quantity: req.body.quantity,
        category: req.body.category,
        description: req.body.description
    }

    rewards.push(reward);

    res.status(200).send(reward)
})


// PUT
app.put('/rewards/:id', (req, res) => {
    const reward = rewards.find(r => r.id === parseInt(req.params.id));
    if (!reward) return res.status(404).send('No reward found!');

    reward.name = req.body.name;
    res.send(reward)
})

// DELETE
app.delete('/rewards/:id', (req, res) => {
    const reward = rewards.find(r => r.id === parseInt(req.params.id));
    if (!reward) res.status(404).send('No reward found!');

    const index = rewards.indexOf(reward);
    rewards.splice(index, 1);

    res.send(rewards)
})



app.listen(port, () => console.log(`Server is now running at ${port}`))