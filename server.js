const helmet = require('helmet');
const server = express();
const cors = require('cors');
const morgan = require('morgan');

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan());

const port = 9000;
server.listen(port, function() {
    console.log(`\n=== Notes API Listening on http://localhost:${ port } ===\n`);
});