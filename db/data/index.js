const { v4: uuidv4 } = require("uuid");

let names = [
  "Sallie Burch",
  "Miles Wilkinson",
  "Faizah Timms",
  "Josie Castaneda",
  "Gustopher Mack",
  "Cherandler Brooks",
  "Kenneth Mcfarlane",
  "Evan Burrows",
  "Iain Ahmadabad",
  "Cemlice Transimpler",
  "Lucian Reeves",
  "Laila Goughing",
  "Jamie-Leigh Golden",
  "Wilson Macias",
  "Umaiza Cuevas",
  "Teo Griffith",
  "Roza Kidding",
  "Sanya Wheatley",
];

let userIds = [
  "PLA9l1hDaWcmAsbHDEpau8v0YL03",
  "gJld3LjqNBXo1wKCvSiY9ezN8CD3",
  "9oaFicEYB7SvSJRUx6hsLnQ4kMs1",
  "KdvRw5xmhnSVQMlCmDYsd5XrjnS2",
  "FIPMe5LrXIPqH4qHsLsLpZeNsQZ2",
  "v4kzc7CFSVfzeniH4zuZ3CrewdH2",
  "6yGSqALJ62UfzcPYmlhjjqN3sp12",
  "O6qaQEtwlxXvohLo2xTvCN6IEk33",
  "vhk7wvdTpyQBWz8YEA2eZsSTvoL2",
  "lbdQLOoPfvPdMdalNKyDSujl7DV2",
  "UB3zJabeBZTl2yVmXswhD1w3upY2",
  "ClCKBuO3KpXGESEz14jyOujkEiP2",
  "lbCUm07tcYf4bI84FU6pSEsfzSI2",
  "tInrjXui4wdbkgrFwes02DHFgI13",
  "O9uwrXJS6aU7q1LIM9G3dKmge5D3",
  "HJA9l1hDaWcmAsbHDEpau8v0YL04",
  "BYA9l1hDaWcmAsbHDEpau8v0YL09",
  "JXA9l1hDaWcmAsbHDEpau8v0YL05",
];

const genSortCode = () => {
  let code = Math.floor(100000 + Math.random() * 900000).toString();
  let formatted =
    code.substring(0, 2) +
    "-" +
    code.substring(2, 4) +
    "-" +
    code.substring(4, 6);
  return formatted;
};

const genAccNumber = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};

const genUpdatedTime = () => {
  var date = new Date(1647453368 * 1000);
  return date.toISOString().replace("T", " ").slice(0, -1);
};

const genData = () => {
  let jsonUserIds = userIds.map((id, i) => ({
    id: uuidv4(),
    user_id: id,
    account_holder: names[i],
    account_number: genAccNumber(),
    sort_code: genSortCode(),
    updated_at: genUpdatedTime(),
  }));

  return jsonUserIds;
};

module.exports = {
  genData,
};
