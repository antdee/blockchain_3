/* ===== Persist data with LevelDB ===================================
|  Learn more: level: https://github.com/Level/level     |
|  =============================================================*/

const level = require('level');
const chainDB = './chaindata';
const db = level(chainDB, { valueEncoding: 'json' });


// Add data to levelDB with key/value pair
function addLevelDBData(key,value){
  db.put(key, value, function(err) {
    if (err) return console.log('Block ' + key + ' submission failed', err);
  })
}


/* ===== SHA256 with Crypto-js ===============================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js  |
|  =========================================================*/

const SHA256 = require('crypto-js/sha256');
const testt = require('./server_test')
const sandbox = require('levelSandbox');
const util = require('util');



/* ===== Block Class ==============================
|  Class with a constructor for block 			   |
|  ===============================================*/

class Block{
	constructor(data){
     this.name = "",
     this.hash = "",
     this.height = 0,
     this.body = data,
     this.time = 0,
     this.previousBlockHash = ""
    }
}

/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

class Blockchain{
  constructor(name){
    this.name = name || 'UdCoin';
    // Check if a blockchain name has been provided
    // This way we can store different blockchains in LevelDB
    if (!name) {
      console.log('\nNo blockchain name provided attempting to use default UdCoin...');
      console.log('Using default UdCoin...');
    }
    // Check our LevelDB if there is chain data for that blockchain name
    this.getBlockHeight()
    .then(result => {
      // If no data exists, make a genesis block
      if (result == -1) {
        return this.addBlock(new Block("First block in the chain - Genesis block"));
      } else {
        // If datais found, log it
        console.log('\nPrevious ',this.name,'Length data exists on leveldb...')
      }
    })

  }

  // Add new block
  addBlock(newBlock){
    // Blockchain name
    newBlock.name = this.name;
    // UTC timestamp
    newBlock.time = new Date().getTime().toString().slice(0,-3);
    // Check for blockheight and block history on LevelDB
    this.getBlockHeight()

    .then(blockHeight => {

      newBlock.height = blockHeight + 1;
      // Previous block key
      // let previousKey = that.name+(newBlock.height-1);

      // If a block history exists...
      if (blockHeight >= 0) {
        // We need to get the previous block hash...
        // Promise to get the previous block
        return  this.getBlock(blockHeight)
                .then(result => {
                // Get the hash from that previous block
                newBlock.previousBlockHash = result.hash;
                //Print out the complete block
                console.log('\nAdding New Block...');
                })
                .catch(err => console.log(err))
      // On error or on empty LevelDB data, we create a new Genesis block to start over
      } else {
        console.log('\nCreating a Genesis Block...')
      } 
        
    })
    .then( () => {
    // Block hash with SHA256 using newBlock and converting to a string
    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
    console.log(newBlock);
    // Make a key to store the chain on leveldb
    // This way we can store different blockchains in LevelDB
    // E.g. 'UdCoin0' is Genesis block key, then 'UdCoin1', 'UdCoin2' etc
    let key = this.name+newBlock.height;
    // Add block object to sandbox
    addLevelDBData(key, newBlock);
    // Update the height of the chain
    // We are storing the chain lenght for later use
    addLevelDBData(this.name+'Length', newBlock.height);
    })
  }
  


  // Return promise with blockheight
  getBlockHeight(){
    return db.get(this.name+'Length').then(result => {
      console.log('\n'+this.name,'height is:',result);
      return result;
      })
      .catch(err => {
      console.log('\nNo',this.name,'Length data found on leveldb...')
      return -1;
      })
  }

  // get block
  getBlock(blockHeight) {
    // return object as a single string
    let key = this.name+blockHeight
    return  db.get(key).then(result => {
      console.log('\nBlock #'+blockHeight+' is:\n',result)
      return result;
    })
    .catch(err => console.log(err))
  }

    // get block
  getBlock_NoLog(blockHeight) {
    // return object as a single string
    let key = this.name+blockHeight
    return  db.get(key).then(result => result
      )
      .catch(err => console.log(err))
  }

  // validate block
  validateBlock(blockHeight){
    console.log('\n***\nValidating Block #'+blockHeight+'...')
    let blockHash ;
    let key = this.name+blockHeight
    return db.get(key)
      .then(result => {
        // Store the old hash
        blockHash = result.hash;
        // Remove the hash
        result.hash = "";
        // Generate fresh block hash
        let validBlockHash = SHA256(JSON.stringify(result)).toString();
        // Compare those two
        if (blockHash===validBlockHash) {
            console.log('\nBlock #'+blockHeight+' Valid Block Hash\n')
            return true;
          } else {
            console.log('\nBlock #'+blockHeight+' invalid hash:\n'+blockHash+'<>'+validBlockHash);
            return false
          }
      })
      .catch(err => {
        console.log('\nError validating block #',blockHeight,'\n')
        console.log(err)
        return false
      })
  }

  // Validate blockchain
  validateChain() {
    let errorLog = [];
    let chainLength;
    let currentBlock;
    let nextBlock;
    // Get the Chain Length from LevelDB
    this.getBlockHeight()
    .then(result => {
        chainLength = result;
        console.log('ChainLength: ' , chainLength);
        // Loop function to check all blocks
        let loop = i => {
          // Check if the hash is correct
          this.validateBlock(i)
          .then(result => {
            if (result == false) errorLog.push(i)
          })
          // Check if we are done going through the blocks
          if (i < chainLength) {
            // Get the current Block
            this.getBlock_NoLog(i)
            .then(result => {

              currentBlock = result;
              // Return a promise, to chain the next action
              return this.getBlock_NoLog(i+1);

            // Get the next Block
            })
            .then(result => {

              nextBlock = result
              let blockHash = currentBlock.hash;
              let previousHash = nextBlock.previousBlockHash;
              // Check if the hash sequence is correct
              if (blockHash!==previousHash) {
                console.log('Error found at Block #'+(i+1)+' Previous Block Hash is invalid\n***')
                errorLog.push(i+1);
              } else {
                console.log('Block #'+(i+1)+' Previous Block Hash is correct.\n***')
              }
            })
            .then(result => {
              // move to the next block, restart the loop
              i++
              loop(i)
            }).catch(err => console.log('err on validateChain',i,'\n', err))
            // If we are done...
          } else {
            //wait 0.5 sec for the last promise and print results
            setTimeout(function() {
              console.log('***\nBlockchain Validation Complete\n')
              if (errorLog.length>0) {
                let uniqueErrors = [...new Set(errorLog)];
                console.log('Block errors = ' + uniqueErrors.length);
                console.log('Blocks: '+uniqueErrors);
              } else {
                console.log('No errors detected');
              }
            }, 500)
          }
          
        };
        // Start at i=0, the Genesis Block
        loop(0)

    }).catch(err => console.log(err))
  }

  // Auto generate  number of blocks, with 0.5 sec delay to complete promises
  generateBlocks (i) {
    if (i<=0) return
    setTimeout( () => {
      db.get(this.name+'Length')
      .then(result => {

        this.addBlock(new Block("Block Generator test data "+(result+1)));
        this.generateBlocks(i-1);

      }).catch(err => console.log(err))
    }, 500)
  }

  // Clears the current chain object in leveldb
  // Currently set to clear 500 blocks
  clearChain() {
    for (var i = 0; i <= 500; i++) {
      db.del(this.name+i).catch(err => console.log(err));
    }
    // Reset the blockchain height
    db.del(this.name+'Length').catch(err => console.log(err));
  }

  // Function to induce errors in code and test validation
  induceErrorBlocks() {
    let inducedErrorBlocks = [1,3,4];
    for (var i = 0; i < inducedErrorBlocks.length; i++) {
      addLevelDBData(this.name+inducedErrorBlocks[i], 'induced chain error')
    }
  }

}
