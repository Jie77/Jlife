const mongoose = require('./connect');
const schema = require('./schema');

const insertOne = async (collectionName, payload) => {
  const collection = mongoose.model(collectionName, schema[collectionName]);
  return new Promise((resolve, reject) => {
    const model = new collection(payload)
    model.save((err, res) => {
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

const updateOne = async (collectionName, whereData, updateData) => {
  const collection = mongoose.model(collectionName, schema[collectionName]);
  return new Promise((resolve, reject) => {
    collection.updateOne(whereData, updateData, (err, res) => {
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

const remove = async (collectionName, payload) => {
  const collection = mongoose.model(collectionName, schema[collectionName]);
  return new Promise((resolve, reject) => {
    collection.remove(payload, (err, res) => {
      if (err) {
        reject({
          status: false,
          msg: '删除失败'
        });
      }else {
        resolve({
          status: true,
          msg: '删除成功',
          data: res
        });
      }
    })
  })
}

exports.insertOne = insertOne;
exports.find = find;
exports.updateOne = updateOne;
exports.remove = remove;