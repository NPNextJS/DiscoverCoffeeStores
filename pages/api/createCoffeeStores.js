import { table, getMinifiedRecords } from "../../libs/airtable";

const createCoffeeStores = async (req, res) => {
  if (req.method === "POST") {
    const { id, name, neighbourhood, address, imgUrl, voting } = req.body;
    try {
      if (id === undefined || id === "") {
        res.status(400);
        res.json({ message: "id is missing" });
        return;
      }
      const findCoffeeStoreRecords = await table
        .select({
          filterByFormula: `id="${id}"`,
        })
        .firstPage();

      if (findCoffeeStoreRecords.length !== 0) {
        const records = getMinifiedRecords(findCoffeeStoreRecords);
        res.json(records);
      } else {
        if (id && name) {
          //create record
          const createdRecords = await table.create([
            {
              fields: {
                id,
                name,
                address,
                neighbourhood,
                voting,
                imgUrl,
              },
            },
          ]);
          const records = getMinifiedRecords(createdRecords);
          res.json({ records });
        } else {
          res.status(400);
          res.json({ message: "id or name is missing" });
        }
      }
    } catch (error) {
      console.error("Error create or find store", error);
      res.status(500);
      res.json({ message: "Error create or find store", error });
    }
  }
};

export default createCoffeeStores;
