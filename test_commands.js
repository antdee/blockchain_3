// Clear old blockchain
for (var i = 0; i <= 100; i++) {
  db.del(i);
}


// start the blockchain and generate Genesis block
let blockchain = new Blockchain()


// Validate Blockchain
blockchain.validateChain();

// Induce errors on some blocks
let inducedErrorBlocks = [1,3,4];
for (var i = 0; i < inducedErrorBlocks.length; i++) {
  addLevelDBData(inducedErrorBlocks[i], 'induced chain error')
}


// start the blockchain and generate Genesis block
let blockchain2 = new Blockchain()

blockchain.addBlock(new Block('test7878')
    ).then( () => blockchain.getBlockHeight()
    ).then(height => blockchain.getBlock(height)
    ).then(result => result)

blockchain.addBlock(new Block('test')).then(result =>{
    console.log('tttt\n', result)
})



getLevelDBData('UdCoinLength')
getLevelDBData('UdCoin0')
getLevelDBData('UdCoin4')

blockchain.generateBlocks(5)

blockchain.addBlock(new Block('test'))



let blockchain2 = new Blockchain('AntCoin')

blockchain2.generateBlocks(5)

blockchain.generateBlocks(5)

blockchain.validateBlock(0)
blockchain.validateBlock(2)
console.log(blockchain.validateBlock(4))

blockchain.validateChain()

blockchain.clearChain()

blockchain.getBlockHeight()

blockchain.getBlock(0)
blockchain.getBlock(6)
blockchain.getBlock(5)

getBlock1(5).then(result => {
                // Get the hash from that previous block
                //newBlock.previousBlockHash = result.hash;
                //Print out the complete block
                console.log(result)
                console.log(result.height)
                console.log(result.hash)
                console.log('\nAdding Block...');
                //console.log(newBlock);
                })

blockchain.induceErrorBlocks()


blockchain.validateBlock(0).then(result => console.log(result))


makeRequest4('UdCoin0')
db.del(blockchain.name+'Length');
validateBlock2(0)


    blockchain.addBlock(new Block("test1"))
    blockchain.addBlock(new Block("test2"))
    blockchain.addBlock(new Block("test3"))


const FakeBlock = new Block("Fake Block"); // Add Fake Block with right hash to test chain
FakeBlock.height = 3;
FakeBlock.time = new Date().getTime().toString().slice(0, -3);
FakeBlock.previousBlockHash = SHA256(JSON.stringify("newBlock")).toString();
FakeBlock.hash = SHA256(JSON.stringify(FakeBlock)).toString();
db.put('UdCoin3', JSON.stringify(FakeBlock));

const FakeBlock = new Block("Fake Block"); // Add Fake Block with right hash to test chain
FakeBlock.height = 4;
FakeBlock.time = new Date().getTime().toString().slice(0, -3);
FakeBlock.previousBlockHash = SHA256(JSON.stringify("newBlock")).toString();
FakeBlock.hash = SHA256(JSON.stringify(FakeBlock)).toString();
db.put('UdCoin4', JSON.stringify(FakeBlock));
db.put('UdCoinLength', 4);


getLevelDBData('UdCoin4')


getBlockHeight3().then(result => {
	console.log(result)
}).catch(err => console.log('catch 2 +',err))

// function getBlockHeight2(){
//     db.get(blockchain.name+'Length').then(function(result) {
//       console.log(result)
//       return result
//     })
//   }



// function testPromise(key) {
//   db.get(key).then(function(result) {
//     console.log(result)
//   }).catch(function(err) {
//     console.log('Wegot error!!! ', err)
//   })
// }

// function testPromise5(key) {
//   db.get(key).then((result) => {
//     console.log(result)
//     return db.get('UdCoin0')
//   }).then(result => 
//     console.log(result)
//   ).catch(err => 
//     console.log('Wegot error!!! ', err)
//   )
// }

// function testPromise6(key) {
//   db.get(key).then((result) => {
//     console.log(result)
//     return db.get('UdCoin0')
//   })
//   .then(result => 
//     console.log(result)
//   )
//   .catch(err => 
//     console.log('Wegot error!!! ', err)
//   )
// }


// if (blockchain.validateBlock(2) == true) {


//             console.log('TTRRUUEE found! Block: ', 2)
//             console.log(2);
            
//           }


// blockchain.validateBlock(2).then(result => {
//   if (result == true) {
//     console.log('TTRRUUEE found! Block: ', 2)
//     console.log(2);
//   }
// })

// let status = false;
// let key = that.name+i
// db.get('UdCoin0').then(function(result) {

//         // Store the old hash
//         blockHash = result.hash;
//         // Remove the hash
//         result.hash = "";
//         // Generate fresh block hash
//         let validBlockHash = SHA256(JSON.stringify(result)).toString();
//         // Compare those two
//         if (blockHash===validBlockHash) {
//             console.log('Block #'+result.height+' Valid Block Hash\n')
//           } else {
//             console.log('Block #'+result.height+' invalid hash:\n'+blockHash+'<>'+validBlockHash);
//             errorLog.push(i);
//           }

//       }).then(result => {
//         console.log('then rerurning...')
//         console.log(status)
//         return status
//       }).catch(err => {
//         console.log('err on !validaBlock   ',blockHeight,'  ????!!! is...\n', err)
//         return status
//       })




