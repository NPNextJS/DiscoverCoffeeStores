import {
  table,
  getMinifiedRecords,
  findRecordByFilter,
} from "../../libs/airtable";

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;

  try {
    if (id === undefined || id === "") {
      res.status(400);
      res.json({ message: "id is missing" });
      return;
    }

    const records = await findRecordByFilter(id);
    if (records.length !== 0) {
      res.json(records);
    } else {
      res.json({ message: "id not found" });
    }
  } catch (error) {
    res.status(500);
    res.json({ message: "Something went wrong", error });
  }
};

export default getCoffeeStoreById;
