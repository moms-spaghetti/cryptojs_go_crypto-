const { query, pool } = require("..");
const { genData } = require("../data");
const { OldEncrypt } = require("../../crypto");

const seeddb = () => {
  pool
    .query(`DELETE FROM payment_detail`)
    .then(() => genData())
    .then((data) =>
      data.map((d) => ({
        id: d.id,
        user_id: d.user_id,
        account_holder: OldEncrypt(d.account_holder),
        account_number: OldEncrypt(d.account_number),
        sort_code: OldEncrypt(d.sort_code),
        updated_at: d.updated_at,
      }))
    )
    .then((data) =>
      data.map((d) =>
        query(
          `INSERT INTO payment_detail
          (id, user_id, account_holder, account_number, sort_code, updated_at) 
          VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            d.id,
            d.user_id,
            d.account_holder,
            d.account_number,
            d.sort_code,
            d.updated_at,
          ]
        )
      )
    );
};

seeddb();
