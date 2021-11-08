const mysql = require("../bin/mysql");
const crypto = require("crypto");

const hash = (password) => {
  return crypto
    .createHmac("sha256", process.env.SECRET_KEY)
    .update(password)
    .digest("hex");
};

const dateToDatetime = (date) => {
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

exports.scheme = {
  email: "",
  password: "",
  created: dateToDatetime(new Date()),
  modified: dateToDatetime(new Date()),
  logined: dateToDatetime(new Date()),
};

exports.isEmailNotExist = (email) => {
  return new Promise((resolve, reject) => {
    mysql.query(
      `SELECT * FROM account WHERE email='${email}'`,
      // `SELECT * FROM account`,
      (error, rows, fields) => {
        if (error) {
          throw error;
        } else {
          // console.log("rows.length:", rows.length);
          if (rows.length) {
            reject();
          } else {
            resolve();
          }
          // console.log(flag);
        }
      }
    );
  });
};

exports.createAccount = (account) => {
  return new Promise((resolve, reject) => {
    const hashedPassword = hash(account.password);
    const newAccount = Object.assign({}, this.scheme, account);

    // const newScheme = this.scheme;
    // newScheme.email = account.email;
    // newScheme.password = hashedPassword;

    // console.log("newAccount", newAccount);
    // console.log(Object.values(newAccount));
    mysql.query(
      `INSERT INTO account (email, password, created, modified, logined) values ` +
        `('${newAccount.email}', '${newAccount.password}', '${newAccount.created}', '${newAccount.modified}', '${newAccount.logined}')`,
      (error, rows) => {
        if (error) {
          throw error;
        } else {
          console.log(`add account ${account.email}`);

          resolve();
        }
      }
    );
  });
};
