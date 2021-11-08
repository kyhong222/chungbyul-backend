const mysql = require("../../bin/mysql");
const Account = require("../../lib/account");
const jwt = require("jsonwebtoken");
const key = process.env.JWT_SECRET;

const printAccounts = async () => {
  mysql.query(`SELECT * FROM account`, (error, rows) => {
    if (error) throw error;
    console.log(rows);
  });
};

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
  const account = req.body;
  account.password = Account.hash(account.password);

  try {
    mysql.query(
      `SELECT * FROM account WHERE email = ?`,
      [account.email],
      (error, rows) => {
        if (error) throw error;
        if (rows.length) {
          // 아이디가 있는 경우
          if (rows[0].password === account.password) {
            // 로그인 성공
            // console.log("success login");

            // 토큰 발급 및 전송
            const token = jwt.sign(
              { email: rows[0].email },
              key,
              {
                expiresIn: "7d",
              },
              (err, token) => {
                if (err) throw err;
                // 토큰 발급
                res.cookie("access_token", token, {
                  httpOnly: true,
                  maxAge: 1000 * 60 * 60 * 24 * 7,
                });

                // 로그인 정보 전달
                res.json({
                  email: rows[0].email,
                });
              }
            );
            // console.log(rows[0].email, key);
            // console.log(token);
          } else {
            // 로그인 실패
            // console.log("failed login, id exists");
            res.json({
              code: 409,
              message: "login failed",
            });
          }
        } else {
          // 아이디가 없는 경우
          // 로그인 실패
          // console.log("failed login, id not exists");
          res.json({
            code: 409,
            message: "login failed",
          });
        }
      }
    );
  } catch (e) {
    throw e;
  }

  // res.json({ code: 200, message: "OK" });
};

exports.logout = async (req, res) => {
  // res.cookie("access_token", null, {
  //   httpOnly: true,
  //   maxAge: 0,
  // });
  res.clearCookie("access_token");
  res.json({
    code: 204,
    message: "logout",
  });
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
  console.log(req.cookies.access_token);
  const token = req.cookies.access_token;
  jwt.verify(token, key, (error, decoded) => {
    if (error) throw error;
    console.log(decoded); // { email: 'kyg@naver.com', iat: 1636390329, exp: 1636995129 }}
  });
  // TODO: use passport
  res.send(req.cookies);
};
