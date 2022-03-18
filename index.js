const { query, pool } = require("./db");
const { Encrypt, OldDecrypt } = require("./crypto");

pool
  .query(`SELECT * FROM payment_detail;`)
  .then((res) => {
    console.log("decrypting with default cryptojs password");
    return res.rows.map((d) => ({
      id: d.id,
      user_id: d.user_id,
      account_holder: OldDecrypt(d.account_holder),
      account_number: OldDecrypt(d.account_number),
      sort_code: OldDecrypt(d.sort_code),
      updated_at: d.updated_at,
    }));
  })
  .then((res) => {
    console.log("encrypting with cryptojs key");
    return res.map((d) => ({
      id: d.id,
      user_id: d.user_id,
      account_holder: Encrypt(d.account_holder),
      account_number: Encrypt(d.account_number),
      sort_code: Encrypt(d.sort_code),
      updated_at: d.updated_at,
    }));
  })
  .then((res) => {
    console.log("updating db");
    res.map((d) =>
      query(
        `
      UPDATE payment_detail
      SET account_holder=$1, account_number=$2, sort_code=$3
      WHERE id=$4`,
        [d.account_holder, d.account_number, d.sort_code, d.id]
      )
    );
  });
