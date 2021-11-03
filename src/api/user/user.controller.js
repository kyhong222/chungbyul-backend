exports.changeNickname = async (req, res) => {
  res.send("change nicename");
};

exports.changeInfo = async (req, res) => {
  res.send("change information");
};

exports.getReservations = async (req, res) => {
  res.send("get my reservations");
};

exports.cancelReservation = async (req, res) => {
  res.send("cancel my reservation");
};

exports.getUserInfo = async (req, res) => {
  res.send("get user's information");
};

exports.getMyInfo = async (req, res) => {
  res.send("get my information");
};
