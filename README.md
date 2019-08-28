# TyrDB
Fast in-memory database for node and browser

Goal is to provide a MemoryAdapter and a FsAdapter with an API very similar to node-mongodb-native. 
We would be able to quickly add a real mongodb adapter after wards.

Usage is mostly intended for bootstraping project, therefore you will find FsAdapter and it's json structure to not suit your need. 
Please, PR another alternative adapter ;) 

# Installation 

`npm install tyrdb`

# Quick start 

```$xslt
mkdir myproject
cd myproject
npm init
npm install tyrdb
touch index.js
```

And there just use that snipets to start playing ! : 

```
const TyrDB = require('tyrdb');
const {MemoryAdapter} = require('tyrdb/adapters')

const adapter = new MemoryAdapter();
const client = new TyrDB({adapter});
const dbName = 'myproject';

async function start(){
 await client.connect();
 console.log('In sync with the adapter/server');
 const db = client.db(dbName);
 client.close();
}
start();
```

# Events : 

```$xslt
db.on('ready',()=>{});
```

- ready
- initialized

## Adapters 

- `MemoryAdapter` : Default adapter. Set Store inMemory. Limited by heap memory available (good enough).
```js
const {MemoryAdapter} = require('tyrdb/adapters')
const adapter = new MemoryAdapter();
const client = new TyrDB({adapter});
```


- `FsAdapter` : FileSystem adapter. Requires a path. (TODO)
```js
const {FsAdapter} = require('tyrdb/adapters')
const adapter = new MemoryAdapter();
const client = new TyrDB({path:'.db/mydbpath',adapter});
```

- `FsSemanticAdapter` : Similar to `FsAdapter` but with semantic file system architecture (Good for proto)
State : For prototype only : We don't even have indexing there.


```js
const {FsSemanticAdapter} = require('tyrdb/adapters')
const adapter = new MemoryAdapter();
const client = new TyrDB({path:'.db/mydbpath',adapter});
```

- `IndexedAdapter` : Persist in web browser indexed db storage
- `LocalStorageAdapter` : Persist in web browser local storage
# Create Collection

```
async function createCol(){
 const db = client.db('myDb');
 const users = db.collection('users');
 client.close();
}
start();
```

# Insert documents

```
async function insertUser(){
 const user = {name:"Obusco", age:28};
 const users = db.collection('users');
 users.insert(user);
 client.close();
}
start();
```
# Find documents

```
async function insertUser(){
 const users = db.collection('users');
 const user = await users.find({name:"Obusco"});
 client.close();
}
start();
```

# Update document

```
async function insertUser(){
 const users = db.collection('users');
 const user = await users.find({name:"Obusco"});
 
 // Way 1
 await user.update({age:29});
 
 // Similar to Mongodb 
 await users.updateOne({name:"Obusco"});

 client.close();
}
start();
```

# Remove document

```
async function insertUser(){
 const users = db.collection('users');
 const user = await users.find({name:"Obusco"});
 
 // Way 1
 await user.remove();
 
 // Similar to Mongodb 
 await users.deleteOne({name:"Obusco"});

 client.close();
}
start();
```


### Difference between .serialize() and .export()

TyrDB by default do not hold any data, only refs and indexes. Data are handled by adapters.
Therefore every element is caracterized by it's own metadata and data. 
`.export()` fetches the metadata elements.
`.serialize()` the json representation of the elements.

### 1-1 CRUD List with Mongodb-native 

#### Read

- [] aggregate
- [] count
- [] distinct
- [] find

#### Write

- [] deleteMany
- [] deleteOne
- [] findOneAndDelete
- [] findOneAndReplace
- [] findOneAndUpdate
- [] insertMany
- [] insertOne
- [] replaceOne
- [] updateMany
- [] updateOne


## TODO 

- [] indices
- [] uniqueNames (for FS, we have a folder `uniques` and file per names, file contains list of sorted used value for this name);
