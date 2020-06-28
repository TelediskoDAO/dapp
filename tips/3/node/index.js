require("dotenv").config();
const session = require("./session");
const project = require("./project");

async function main() {
  const url = "https://odoo.teledisko.com/jsonrpc";
  const db = "teledisko";
  const username = process.env.ODOO_USERNAME;
  const password = process.env.ODOO_PASSWORD;
  const s = await session(url, db, username, password);
  //await myTasks(s);
  await project.myTrackings(s);
  //const r = await s.r("project.task", { user_id: s.uid });
  //console.log(JSON.stringify(r, null, 2));
}

main().catch(console.log);
