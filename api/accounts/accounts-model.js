const db = require("../../data/db-config");

module.exports = {
  get,
  getById,
  add,
  update,
  remove,
};

function get() {
  return db().from("accounts").select("id as accounts_id", "name", "budget");
}

function getById(id) {
  return db("accounts").where("id", id).first();
}

function add(account) {
  return db("accounts")
    .insert(account)
    .then(([id]) => {
      return getById(id);
    });
}

function update(id, account) {
  // UPDATE accounts SET name = 'foo', budget = 'bar' WHERE id = 1;
  return db("accounts")
    .update(account)
    .where("id", id)
    .then(() => {
      return getById(id);
    });
}

async function remove(id) {
  // DELETE FROM accounts WHERE id = 1;
  const accountToDelete = await getById(id);
  await db("accounts").delete().where("id", id);
  return Promise.resolve(accountToDelete);
}
