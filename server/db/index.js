const MongoClient = require('mongodb').MongoClient;
const { dbpath } = require('./config');

const connectDB = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbpath, { useNewUrlParser: true }, (err, db) => {
      if(err) {
        reject('数据库连接失败');
      }else {
        resolve(db);
      }
    })
  })
}

exports.insertOne = async (collectionName, payload) => {
  try{
    const db = await connectDB();
    const dbase = db.db('Jlife');
    return new Promise((resolve, reject) => {
      dbase.collection(collectionName).insertOne(payload, (err, res) => {
        if (err) {
          reject({
            status: false,
            msg: '插入失败'
          });
        }else {
          resolve({
            status: true,
            msg: '插入成功'
          });
        }
        db.close();
      })
    })
  }catch(e) {
    console.log(e);
  }
}

exports.find = async (collectionName, payload) => {
  try{
    const db = await connectDB();
    const dbase = db.db('Jlife');
    return new Promise((resolve, reject) => {
      dbase.collection(collectionName).find(payload).toArray((err, res) => {
        if (err) {
          reject({
            status: false,
            msg: '查询失败'
          });
        }else {
          resolve({
            status: true,
            msg: '查询成功',
            res: res
          });
        }
        db.close();
      })
    })
  }catch(e) {
    console.log(e);
  }
}

exports.updateOne = async (collectionName, whereData, updateDate ) => {
  try {
    const db = await connectDB();
    const dbase = db.db('Jlife');
    // const updateDate = {$set: newData};
    return new Promise((resolve, reject) => {
      dbase.collection(collectionName).updateOne(whereData, updateDate, (err, res) => {
        if (err) {
          reject({
            status: false,
            msg: '更新失败'
          });
        }else {
          resolve({
            status: true,
            msg: '更新成功'
          });
        }
        db.close();
      })
    })
  }catch(e) {
    console.log(e);
  }
}

exports.deleteOne = async (collectionName, whereData) => {
  const db = await connectDB();
  const dbase = db.db('Jlife');
  return new Promise((resolve, reject) => {
    dbase.collection(collectionName).deleteOne(whereData, (err, res) => {
      if (err) {
        reject({
          status: false,
          msg: '删除失败'
        });
      }else {
        resolve({
          status: true,
          msg: '删除成功'
        });
      }
      db.close();
    })
  })
}