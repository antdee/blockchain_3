let blockchain = new Blockchain()
blockchain.addBlock(new Block('test'))
blockchain.addBlock(new Block('test2'))
blockchain.addBlock(new Block('test3'))
blockchain.chain

blockchain.addBlock2(new Block("test data11 4"));

npm install level --save

for (var i = 0; i <= 100; i++) {
  db.del(i);
}

for (var i = 0; i <= 5; i++) {
  addBlock(new Block("test data22 "+i));
}

(function theLoop (i) {
  setTimeout(function () {
    // code here
    if (--i) theLoop(i);
  }, 500);
})(10)
////////////////////////

let i = 0;                     //  set your counter to 0
let errorLog = [];
let chainLength;
let currentBlock;
let nextBlock;
// Get the Chain Length
db.get('chainLength').then(function(result) {
  chainLength = result;
  console.log('chainLength: \n' , chainLength);
}).then(function myLoop () {   //  create a loop function
   setTimeout(function () {    //  call a 0.5s setTimeout when the loop is called
      console.log('hello block ', i);          //  your code here
////////////////
	  



      i++;                     //  increment the counter
      if (i < chainLength) {            //  if the counter < 10, call the loop function
         myLoop();             //  ..  again which will trigger another 
      }                        //  ..  setTimeout()
   }, 500)
})     


//////////////////
function myLoop () {           //  create a loop function
   setTimeout(function () {    //  call a 0.5s setTimeout when the loop is called
      alert('hello');          //  your code here





      i++;                     //  increment the counter
      if (i < chainLength) {            //  if the counter < 10, call the loop function
         myLoop();             //  ..  again which will trigger another 
      }                        //  ..  setTimeout()
   }, 500)
}
/////////////////////////////////



for (var i = 0; i <= 3; i++) {
	setTimeout(function() {
		blockchain.addBlock2(new Block("test data "+i));
	}, 1000);
}
// Test Generate blocks
function generateBlocks (i) {
  setTimeout(function () {
  	i++
    blockchain.addBlock(new Block("test data "+i));
    if (i <= 10) generateBlocks(i);
  }, 200);
};


function validateChain2() {
      let errorLog = [];
      let chainLength;
      let currentBlock;
      let nextBlock;
      // Get the Chain Length
      db.get('chainLength', function(err, value) {

      	if (err) return console.log('Not found!', err);
        chainLength = value;
        console.log('chainLength: ' , chainLength);
        return value;

      }).then(db.get(0, function(err, value) {

      	if (err) return console.log('Not found!', err);
      	currentBlock = value;
      	console.log('0: consol log value :',value);
      	console.log('first function currentblock = ',currentBlock);

      })).then(db.get(1, function(err, value) {

      	if (err) return console.log('Not found!', err);
      	nextBlock = value;
      	console.log('1: consol log value :',value);
      	console.log('first function nextBlock = ',nextBlock);

      })).then(function() {

      	console.log('last function chainlegth = ', chainLength);
      	console.log('last function currentBlock = ', currentBlock);
      	console.log('last function nextBlock = ', nextBlock);

      })
  }
let tess = 1;
db.get(0).then(function(value) {
	console.log(value);
	tess = value.hash;
})
tess


function validateChain3() {
      let errorLog = [];
      let chainLength;
      let currentBlock;
      let nextBlock;
      // Get the Chain Length
      db.get('chainLength').then(function(result) {

        chainLength = result;
        console.log('chainLength: ' , chainLength);
        return db.get(2);

      }).then(function(result) {

      	currentBlock = result;
      	console.log('0: console log result :',result);
      	console.log('first function currentblock = ',currentBlock);
      	return db.get(3);


      }).then(function(result) {

      	nextBlock = result;
      	console.log('1: console log result :',result);
      	console.log('first function nextBlock = ',nextBlock);


      }).then(function(result) {

      	console.log('last function chainlegth = ', chainLength);
      	console.log('last function currentBlock = ', currentBlock);
      	console.log('last function nextBlock = ', nextBlock);

      })
  }

function validateChain4() {
      let errorLog = [];
      let chainLength;
      let currentBlock;
      let nextBlock;
      // Get the Chain Length
      db.get('chainLength').then(function(result) {

        chainLength = result;
        console.log('chainLength: ' , chainLength);
        for (var i = 0; i < result; i++) {
        	console.log('the i is...: ',i)
        	// validate block
        	// change to this
          if (!blockchain.validateBlock(i)) errorLog.push(i);

          db.get(i).then(function(result) {

          	currentBlock = result;
	      	console.log(result.height, ': console log result :',result);
	      	console.log('first function currentblock = ',currentBlock);
	      	return db.get(i+1);


          }).then(function(result) {

          	nextBlock = result;
	      	console.log(result.height, ': console log result :',result);
	      	console.log('first function nextBlock = ',nextBlock);

          }).then(function(result) {

          	console.log('last function chainlegth = ', chainLength);
	      	console.log('last function currentBlock = ', currentBlock);
	      	console.log('last function nextBlock = ', nextBlock);

	      	console.log('Validating Block #'+i)
            let blockHash = currentBlock.hash;
            console.log(blockHash);
            let previousHash = nextBlock.previousBlockHash;
            console.log(previousHash);

            if (blockHash!==previousHash) {
              errorLog.push(i);
            }

          })
        }
      	}).then(function(result) {

      		if (errorLog.length>0) {
	          console.log('Block errors = ' + errorLog.length);
	          console.log('Blocks: '+errorLog);
	        } else {
	          console.log('No errors detected');
	        }

      	})
  }

(function theLoop (i) {
  setTimeout(function () {
    addDataToLevelDB('Testing data');
    if (--i) theLoop(i);
  }, 100);
})(10);


// it works...
function validateChain5() {
	let errorLog = [];
	let chainLength;
	let currentBlock;
	let nextBlock;
	// Get the Chain Length
	db.get('chainLength').then(function(result) {

	    chainLength = result;
	    console.log('chainLength: ' , chainLength);
	    ////////////////////
	    (function theLoop(i) {

	    	if (i<chainLength) {

	        	console.log('the i is...: ',i)
	        	// validate block
	        	// change to this
				if (blockchain.validateBlock(i) == false) {

					errorLog.push(i);
					console.log('Error found! Block: ', i)
					console.log(errorLog);
				}


				db.get(i).then(function(result) {

					currentBlock = result;
					console.log('Block: ', result.height);
					console.log('first function currentblock = ',currentBlock);
					return db.get(i+1);
					

				}).then(function(result) {

					nextBlock = result;
					console.log('Block: ', result.height);
					console.log('first function nextBlock = ',nextBlock);

				}).then(function(result) {

					console.log('last function chainlegth = ', chainLength);
					console.log('last function currentBlock = ', currentBlock);
					console.log('last function nextBlock = ', nextBlock);

					console.log('\nValidating Block #'+i)
					let blockHash = currentBlock.hash;
					console.log('Current Block Hash: ', blockHash);
					let previousHash = nextBlock.previousBlockHash;
					console.log('Next Block PreviousBlockHash: ', previousHash);

					if (blockHash!==previousHash) {

						console.log('Error found at Block: ', i)
					 	errorLog.push(i);
					}

				}).then(function(result) {

					i++
					theLoop(i);

				})
	 		} else {
	 			console.log('\nBlockchain Validation Complete\n')
	 			if (errorLog.length>0) {
			        console.log('Block errors = ' + errorLog.length);
			        console.log('Blocks: '+errorLog);
		        } else {
		        	console.log('No errors detected');
		        }
	 		}

    	})(0);
    ////////////////////
  	})
}





  function getLevelDBData(key){
  db.get(0, function(err, value) {
    if (err) return console.log('Not found!', err);
    console.log(JSON.stringify(value, null, 4));
    return value;
  }).then(function(result) {
  	console.log('ha!')
  })
}

      /*
      	// validate block
      	//if (!this.validateBlock(i)) errorLog.push(i);
      	// compare blocks hash link
     	// Get the current block
     	db.get(i).then(function(result2) {
            currentBlock = result2
            console.log('currentBlock: \n',currentBlock);
          }).then(function() {
              db.get(i+1).then(function(result3) {
              nextBlock = result3
              console.log('nextBlock: \n', nextBlock);
            }).then(function() {
            // Then check the hashes
              console.log('Validating Block #'+i)
              let blockHash = currentBlock.hash;
              console.log(blockHash);
              let previousHash = nextBlock.previousBlockHash;
              console.log(previousHash);
              if (blockHash!==previousHash) {
                errorLog.push(i);
              }
          })
        }

      if (errorLog.length>0) {
        console.log('Block errors = ' + errorLog.length);
        console.log('Blocks: '+errorLog);
      } else {
        console.log('No errors detected');
      }
      })
}
*/

for (var i = 0; i <= 2; i++) {
  blockchain.addBlock(new Block("test data22 "+i));
}
for (var i = 0; i <= 5; i++) {
  addBlock2(new Block("test data22 "+i));
}

for (var i = 0; i <= 20; i++) {
  getLevelDBData(i);
}

for (var i = 0; i <= 5; i++) {
  getLevelDBData(i);
}

for (var i = 0; i <= 100; i++) {
  db.del(i);
}

for (var i = 0; i <= 20; i++) {
  getLevelDBData2(i);
}

db.get(0, function (err, value) {
    if (err) throw err
    console.log(value)
  })





function getLevelDBData2(key){
  db.get(key, function(err, value) {
    console.log(value);
    if (err) return console.log('Not found!', err);
    console.log('Value = ' + value);
   // console.log(util.inspect(value, {showHidden: false, depth: null}));
    //console.log(util.inspect(value, false, null))
    //console.log(JSON.stringify(value, null, 4));
    //console.log(JSON.stringify(value, null, 0));
    //for(var property in value) {
    //console.log(property + "=" + value[property]);
    //}
  })
}

db.get(0, function (err, value) {
        console.log(value);
        return value;
      }).then(function(value) {
	console.log(value);
	tess = value.hash;
})
tess

let tess = 1;
db.get(0).then(function(result) {
	console.log(result);
	tess = result.hash;
})
tess


db.get(0).then(function(result) {
	previousBlockHash = result.hash;
})


getHeight(){
  new Promise(function(resolve) {
    var stream = db.createReadStream()
    var heights = []
    stream.on('data', function(data){
      heights.push(data.value.height);
    }).on('end', function() {
      resolve(heights.length);
    })
  }).then(function(height) {
    console.log(height)     // 2
    return height;          // undefined
  });
}

 // Add block object to sandbox
    addLevelDBData(newBlock.height, {hash : newBlock.hash,
                                     height : newBlock.height,
                                     body : newBlock.body,
                                     time : newBlock.time,
                                     previousBlockHash : newBlock.previousBlockHash});




db.createReadStream().on('data', function (data) {
    console.log(data.key, '=', data.value)
  }).on('error', function (err) {
    console.log('Oh my!', err)
  }).on('close', function () {
    console.log('Stream closed')
  }).on('end', function () {
    console.log('Stream ended')
  })

  getBlock2(blockHeight){
      // return object as a single string
      //return JSON.parse(JSON.stringify(this.chain[blockHeight]));
      return JSON.parse(JSON.stringify(getLevelDBData(blockHeight));
    }
    getBlock2(1){
      // return object as a single string
      //return JSON.parse(JSON.stringify(this.chain[blockHeight]));
      return JSON.parse(JSON.stringify(getLevelDBData(blockHeight));
    }