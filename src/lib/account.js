const mysql = require("../bin/mysql");
const crypto = require("crypto");

const hash = (password) => {
  return crypto
    .createHmac("sha256", process.env.SECRET_KEY)
    .update(password)
    .digest("hex");
};

const dateToDatetime = (date) => {
  let dateString = "";
  dateString = date.toISOString().split("T");
  return (dateString = dateString[0] + " " + dateString[1].split(".")[0]);
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
          console.log("rows.length:", rows.length);
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
    const newScheme = this.scheme;
    newScheme.email = account.email;
    newScheme.password = hashedPassword;

    console.log("newScheme", newScheme);
    console.log(Object.values(newScheme));
    mysql.query(
      `INSERT INTO account (email, password, created, modified, logined) values ` +
        `('${newScheme.email}', '${newScheme.password}', '${newScheme.created}', '${newScheme.modified}', '${newScheme.logined}')`,
      (error, rows) => {
        if (error) {
          throw error;
        } else {
          console.log(`add account ${account.email}, ${account.password}`);

          resolve();
        }
      }
    );
  });
};
