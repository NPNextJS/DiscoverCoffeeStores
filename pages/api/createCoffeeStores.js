var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base("coffee-stores");

console.log(table);

const createCoffeeStores = (req, res) => {
  if (req.method == "POST") {
    return res.status(200).json({ message: "hello" });
  } else {
    return res.status(200).json({ message: "POST only" });
  }
};

export default createCoffeeStores;
