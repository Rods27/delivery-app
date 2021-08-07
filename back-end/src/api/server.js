// const socket = require('socket.io');
const app = require('./app');

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Listening in on port: ${PORT}`));
