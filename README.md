# Blockchain Data

Blockchain has the potential to change the way that the world approaches data. Develop Blockchain skills by understanding the data model behind Blockchain by developing your own simplified private blockchain.
On this project, we will use the [Hapi.js](https://hapijs.com/) framewrk to configure a RESTful Web API and provide API Endpoints.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Installing Node and NPM is pretty straightforward using the installer package available from the (Node.js® web site)[https://nodejs.org/en/].

### Configuring your project, fast way

From the project directory, simpy run 
```
npm install
```
This will get all the required packages from `package.json` and install them


### Configuring your project, long way

- Use NPM to initialize your project and create package.json to store project dependencies.
```
npm init
```
- Install crypto-js with --save flag to save dependency to our package.json file
```
npm install crypto-js --save
```
- Install level with --save flag
```
npm install level --save
```
- Install hapi and save it to your package.json dependencies:
```
npm install hapi --save
```
- Install inert
```
npm install --save inert
```

## Testing

To test code:
1: Open a command prompt or shell terminal after install node.js.
2: Enter a node session, also known as REPL (Read-Evaluate-Print-Loop).
```
node
```
3: Copy and paste `simpleChain.js` into your node session

4: Generate 5 blocks using the generateBlocks(i) function
```
blockchain.generateBlocks(5)
```
5: Get blockheight

In browser, navigate to http://localhost:8000/height and you get the blockchain height returned.

Or, in the terminal use

`curl -X "GET" "http://localhost:8000/height"`

6: Get block

In browser, navigate to http://localhost:8000/block/{input} and you get the block at height {input} returned.
For example http://localhost:8000/getblock/0 will return the genesis block

Or, in the terminal use

`curl -X "GET" "http://localhost:8000/block/0"`


7: Add block

In browser, navigate to http://localhost:8000/addblock/{data} and it will add a block in the cahin with {data} as the block body.
Then, it will return the last block of the chain
For example, http://localhost:8000/addblock/test will add the next block with body : test
and then return it

Or, in the terminal use 
```
$ curl -X "POST" "http://localhost:8000/block" -H 'Content-Type: application/json' -d $'{"body":"test!"}'
```
## Bugs and improvements

Running `node simpleChain.js ` will return an error:
`OpenError: IO error: lock ./chaindata/LOCK: already held by process`
I would like a more elegant way to run the app than pasting the whole code in the node terminal.



