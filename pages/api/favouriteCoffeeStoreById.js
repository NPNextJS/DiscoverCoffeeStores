import { findRecordByFilter } from "@/libs/airtable";

const favouriteCoffeeStoreById = async (req, res) => {
  if (req.method === "PUT") {
    try {
      const { id } = req.body;
      if (id === undefined || id === "") {
        res.status(400);
        res.json({ message: "id is missing" });
        return;
      }
      const records = await findRecordByFilter(id);
      if (records.length !== 0) {
        res.json(records);
      } else {
        res.json({ message: "Coffee store id doesn't exist", id });
      }
    } catch (error) {
      res.status(500);
      res.json({ message: "Error upvote coffee store", error });
    }
  }
};

export default favouriteCoffeeStoreById;
