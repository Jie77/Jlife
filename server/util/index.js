const axios = require('axios');
const jwt = require('jsonwebtoken');
const { find } = require('../db');

const getRequest = (url, option) => {
  return new Promise((resolve, reject) => {
    axios.get(url, option).then((res) => {
      resolve(res);
    }).catch((error) => {
      reject(error);
    });
  })
}

const generateToken = (payload, privateKey) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, privateKey, (err, token) => {
      if (err) {
        reject('token生成失败')
      } else {
        resolve(token)
      }
    })
  })
}

const verifyToken = (privateKey, openid, token) => {
  console.log(privateKey)
  console.log(token)
  return new Promise((resolve, reject) => {
    jwt.verify(token, privateKey, (err, decoded) => {
      console.log(err)
      console.log(decoded)
      if(err) {
        reject({
          status: false,
          msg: '验证失败'
        })
      }
      if (decoded && decoded.openid === openid) {
        resolve({
          status: true,
          msg: 'success'
        })
      }
    });
  })
}

const auth = async (openid, token) => {
  console.log(`openid: ${openid}`)
  const collection = await find('userInfo', {openid: openid});
  console.log(collection)
  if(collection.data.length === 0) {
    return false;
  }
  const privateKey = collection.data[0].session_key;
  const res = await verifyToken(privateKey, openid, token);
  return res.status;
}

exports.auth = auth;
exports.verifyToken = verifyToken;
exports.generateToken = generateToken;
exports.getRequest = getRequest;