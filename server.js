
//*********************************************************

/* ===== Server with Hapi.js  ===============================
|            Learn more: https://hapijs.com/                 |
|  =========================================================*/


'use strict';

const Hapi = require('hapi');
const greeting = `Hello, world!<br>
                  RESTful Web API with Node.js Framework<br>
                  Serving UdCoin blockchain data<br>
                  <br>
                  Valid paths:<br><br>

                  /height<br>
                  Returns the height of the chain<br><br>

                  /getblock/{input}<br>
                  Returns the block from provided user input, in JSON<br><br>

                  /addblock/{data}<br>
                  Adds a block to the chain with {data} as its body.<br>
                  Returns the new block
                  `

const {Block, Blockchain} = require('./simpleChain');
let blockchain = new Blockchain()


const server = Hapi.server({
    port: 8000,
    host: 'localhost'
});


// Homepage, greets and shows valid paths
server.route({
    method: 'GET',
    path: '/',
    handler: async (request, h) => {

        return greeting;
    }
});


// Returns blockheight, simple number
server.route({
    method: 'GET',
    path: '/height',
    handler: async (request, h) => {

      let height = await blockchain.getBlockHeight()
      if (height >= 0) return height
      else return 'Error. No blockheight data found...'

    }
});

// Returns the block from provided user input, in JSON
server.route({
    method: 'GET',
    path: '/block/{input}',
    handler: async (request, h) => {

      // If there is no height, return an Error
      let maxHeight = await blockchain.getBlockHeight()
      if (maxHeight < 0) return 'Error. No blockheight data found...'

      // Try to make the input an Int
      let input = parseInt(request.params.input)

      // Check if input is a a valid blockHeight
      if (input >= 0 && maxHeight >= input)
        // Return the block
        return await blockchain.getBlock(input)
      else return `Invalid user input, please provide a number
                   between 0 and ${maxHeight}
                  `
    }
});

// First method to add blocks from browser
server.route({
    method: 'GET',
    path: '/addblock/{data}',
    handler: (request, h) => {
      // get blockdata from user input
      let blockData = encodeURIComponent(request.params.data)
      // Retunn a promise, adds the block
      return blockchain.addBlock(new Block(blockData))
        // Gets the latest block, which is the one we just added above
        .then(height => blockchain.getBlock_NoLog(height))
        // Returns it
        .then(result => result)

    }
});

// Second method to add blocks with POST
server.route({
    method: 'Post',
    path: '/block',
    handler: (request, h) => {
      // get blockdata from user input
      let blockData = request.payload.body
      // Retunn a promise, adds the block
      return blockchain.addBlock(new Block(blockData))
        // Gets the latest block, which is the one we just added above
        .then(height => blockchain.getBlock_NoLog(height))
        // Returns it
        .then(result => result)
    }
});



const init = async () => {


    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: true,
            logEvents: [null, false]
        }
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
