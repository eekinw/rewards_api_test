const express = require('express');
const app = express();
const port = 3002;

const rewards = [
    {
        id: 1,
        name: "SUPA Shirt",
        points: 50,
        quantity: 100,
        category: "clothing",
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

const redemptions = [
    {
      id: 234,
      user_id: 34325,
      reward_id: 42342,
      redemption_date: "2023-07-24 13:59:10" ,
      redemption_status: "completed",
      redemption_expiry: "2023-09-24 13:59:10"
    },
        {
      id: 567,
      user_id: 344545,
      reward_id: 45543,
      redemption_date: "2023-06-24 13:59:10" ,
      redemption_status: "completed",
      redemption_expiry: "2023-08-24 13:59:10"
    },
]

app.use(express.json());

// req: client to server
// res: server back to client


// GET
// app.get('/rewards', (req, res) => {
//     res.send(rewards)
// })

// Searching for a reward
app.get(`/rewards`, (req, res) => {
    const { name, points, category, description } = req.query;
    // console.log({ name, points, category, description })
    

    if (!{ name, points, category, description }) {
        return res.send(rewards)
    }

    // find a way to read just the values of the object, check if the search term matches the value
    // values = ["a ", 10, true], search = "a"
    // const rewardsFound = rewards.filter(r => Object.values(r).includes(search));
    const rewardsFound = rewards.filter(r => r.name === name || r.points === parseInt(points) || r.category === category || r.description === description)

    if (!rewardsFound || rewardsFound.length === 0) {
        return res.status(404).send('No such rewards exists!')
    }

    return res.send(rewardsFound)
} )

app.get('/redemptions', (req, res) => {
    res.send(redemptions)
})

app.get('/redemptions/:id', (req, res) => {
    const redemption = redemptions.find(r => r.id === parseInt(req.params.id));
    if (!redemption) return res.status(404).send('No reward found!');

    res.send(redemption)
})

app.get('/rewards/:id', (req, res) => {
    const reward = rewards.find(r => r.id === parseInt(req.params.id));
    if (!reward) return res.status(404).send('No reward found')
    
    res.send(reward)
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