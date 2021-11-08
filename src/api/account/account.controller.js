const mysql = require("../../bin/mysql");
const crypto = require("crypto");
const { resolve } = require("path");
const Account = require("../../lib/account");

const printAccounts = async () => {
  mysql.query(`SELECT * FROM account`, (error, rows) => {
    if (error) throw error;
    console.log(rows);
  });
};

const isEmailExist = (email) =>
  new Promise((resolve, reject) => {
    mysql.query(
      `SELECT * FROM account WHERE email='${email}'`,
      // `SELECT * FROM account`,
      (error, rows, fields) => {
        if (error) {
          resolve();
        } else {
          // console.log("rows.length:", rows.length);
          if (rows.length) {
            resolve();
          } else {
            reject(false);
          }
          // console.log(flag);
        }
      }
    );
  });

exports.signUp = async (req, res) => {
  const account = req.body;
  const existNotPromise = Account.isEmailNotExist(account.email);

  existNotPromise
    .then(() => {
      // 이메일이 존재하지 않음 => 가입 허가
      // console.log(newAccount);
      Account.createAccount(account);
      res.json({
        code: 200,
        message: "OK",
      });
    })
    .catch(() => {
      // 이메일이 이미 존재하거나, 에러가 남 => 가입 불허
      res.json({
        code: 409,
        failed: "email is exists",
      });
    });
};

exports.login = async (req, res) => {
  res.send("login");
};

exports.findID = async (req, res) => {
  res.send("find ID");
};

exports.findPW = async (req, res) => {
  res.send("find PW");
};

exports.changePW = async (req, res) => {
  res.send("change PW");
};

exports.printAccounts = async (req, res) => {
  printAccounts();
  res.send("done");
};

exports.test = async (req, res) => {
  isEmailExist("kyhong222@naver.coms");
  res.send("done");
};
