import { docClient } from "./dynamodb.mjs";
import { ids } from "./staticIds.mjs";

const SAMPLE = [
  {
    pk: ids.userId,
    sk: ids.userId,
    name: "user-1",
    watchlistIds: [ids.watchlistId1, ids.watchlistId2, ids.watchlistId3],
  },
  {
    pk: ids.userId,
    sk: ids.watchlistId1,
    name: "watchlist-1",
    watchlistIds: [
      ids.transactionId11,
      ids.transactionId12,
      ids.transactionId13,
      ids.transactionId14,
      ids.transactionId15,
      ids.transactionId16,
    ],
  },
  {
    pk: ids.userId,
    sk: ids.watchlistId2,
    name: "watchlist1-2",
    watchlistIds: [
      ids.transactionId21,
      ids.transactionId22,
      ids.transactionId23,
    ],
  },
  {
    pk: ids.userId,
    sk: ids.watchlistId3,
    name: "watchlist1-3",
    watchlistIds: [],
  },
  {
    pk: ids.userId,
    sk: ids.watchlistId3,
    name: "watchlist1-3",
  },
  {
    pk: ids.userId,
    sk: ids.transactionId11,
    name: "transaction-1-1",
  },
  {
    pk: ids.userId,
    sk: ids.transactionId12,
    name: "transaction-1-2",
  },
  {
    pk: ids.userId,
    sk: ids.transactionId13,
    name: "transaction-1-3",
  },
  {
    pk: ids.userId,
    sk: ids.transactionId14,
    name: "transaction-1-4",
  },
  {
    pk: ids.userId,
    sk: ids.transactionId15,
    name: "transaction-1-5",
  },
  {
    pk: ids.userId,
    sk: ids.transactionId16,
    name: "transaction-1-6",
  },
  {
    pk: ids.userId,
    sk: ids.transactionId21,
    name: "transaction-2-1",
  },
  {
    pk: ids.userId,
    sk: ids.transactionId22,
    name: "transaction-2-2",
  },
  {
    pk: ids.userId,
    sk: ids.transactionId23,
    name: "transaction-2-3",
  },
];

async function put() {
  for (let item of SAMPLE) {
    const params = {
      TableName: "Greening",
      Item: item,
    };

    try {
      await docClient.put(params).promise();
      console.log("PutItem succeeded:", item.name);
    } catch (e) {
      console.error(
        "Unable to add item",
        item.name,
        ". Error JSON:",
        JSON.stringify(err, null, 2)
      );
    }
  }
}

put();
