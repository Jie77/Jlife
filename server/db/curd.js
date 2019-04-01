const mongoose = require('./connect');
const schema = require('./schema');

const insertOne = async (collectionName, payload) => {
  const collection = mongoose.model(collectionName, schema[collectionName]);
  return new Promise((resolve, reject) => {
    collection.save(payload, (err) => {
      if(err) {
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
    })
  })
}

const find = async (collectionName, payload) => {
  const collection = mongoose.model(collectionName, schema[collectionName]);
  return new Promise((resolve, reject) => {
    collection.find(payload, (err, res) => {
      if (err) {
        reject({
          status: false,
          msg: '查询失败'
        });
      }else {
        resolve({
          status: true,
          msg: '查询成功',
          data: res
        });
      }
    })
  })
}