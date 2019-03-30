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
  return new Promise((resolve, reject) => {
    jwt.verify(token, privateKey, (err, decoded) => {
      if (decoded.openid === openid) {
        resolve({
          status: true,
          msg: 'success'
        })
      } else {
        reject({
          status: false,
          msg: '验证失败'
        })
      }
    });
  })
}

const auth = async (openid, token) => {
  const collection = await find('userInfo', {openid: openid});
  console.log(collection)
  const privateKey = collection.data[0].session_key;
  const res = await verifyToken(privateKey, openid, token);
  return res.status
}

exports.auth = auth;
exports.verifyToken = verifyToken;
exports.generateToken = generateToken;
exports.getRequest = getRequest;