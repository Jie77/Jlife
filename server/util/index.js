const axios = require('axios');
const jwt = require('jsonwebtoken');

exports.getRequest = (url, option) => {
  return new Promise((resolve, reject) => {
    axios.get(url, option).then((res) => {
      resolve(res);
    }).catch((error) => {
      reject(error);
    });
  })
}

exports.generateToken = (payload, privateKey) => {
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

exports.verifyToken = (privateKey, openid, token) => {
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