/* ===== Persist data with LevelDB ===================================
|  Learn more: level: https://github.com/Level/level     |
|  =============================================================*/

const level = require('level');
const chainDB = './chaindata';
const db = level(chainDB, { valueEncoding: 'json' });
//const db = level(chainDB);

// Add data to levelDB with key/value pair
function addLevelDBData(key,value){
  db.put(key, value, function(err) {
    if (err) return console.log('Block ' + key + ' submission failed', err);
  })
}

// Get data from levelDB with key
function getLevelDBData(key){
  db.get(key, function(err, value) {
    if (err) return console.log('Not found!', err);
    console.log(JSON.stringify(value, null, 4));
  })
}


  // get block
function getBlock1(blockHeight) {
    // return object as a single string
    let key = blockchain.name+blockHeight
    return  db.get(key).then(result => {
      console.log(result)
      console.log(result.height)
      console.log(result.hash)
      return result
    })
    .catch(err => console.log(err))
  }

  // get block
function getBlock2(blockHeight) {
    // return object as a single string
    let key = blockchain.name+blockHeight
    db.get(key).then(result => {
      console.log(result)
      console.log(result.height)
      console.log(result.hash)
      return result;
    })
    .catch(err => console.log(err))
  }
