const express = require('express')

const app = express();
app.use(express.json());

app.get('/api/v1', (req, res) => {
  res.send("<h2> Hello </h2>")
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`))


