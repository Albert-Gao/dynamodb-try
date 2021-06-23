import { docClient } from "./dynamodb.mjs";
import { ids } from "./staticIds.mjs";

const SAMPLE = [
  {
    pk: ids.userId,
    sk: ids.userId,
    info: {
      name: "user-1",
    },
  },
  {
    pk: ids.userId,
    sk: ids.watchlistId1,
    info: {
      name: "watchlist-1",
    },
  },
  {
    pk: ids.userId,
    sk: ids.watchlistId2,
    info: {
      name: "watchlist1-2",
    },
  },
  {
    pk: ids.userId,
    sk: ids.watchlistId3,
    info: {
      name: "watchlist1-3",
    },
  },
  {
    pk: ids.userId,
    sk: ids.watchlistId3,
    info: {
      name: "watchlist1-3",
    },
  },
  {
    pk: ids.userId,
    sk: ids.transactionId11,
    info: {
      name: "transaction-1-1",
    },
  },
  {
    pk: ids.userId,
    sk: ids.transactionId12,
    info: {
      name: "transaction-1-2",
    },
  },
  {
    pk: ids.userId,
    sk: ids.transactionId13,
    info: {
      name: "transaction-1-3",
    },
  },
  {
    pk: ids.userId,
    sk: ids.transactionId21,
    info: {
      name: "transaction-2-1",
    },
  },
  {
    pk: ids.userId,
    sk: ids.transactionId22,
    info: {
      name: "transaction-2-2",
    },
  },
  {
    pk: ids.userId,
    sk: ids.transactionId23,
    info: {
      name: "transaction-2-3",
    },
  },
];

SAMPLE.forEach(function (item) {
  const params = {
    TableName: "Greening",
    Item: item,
  };

  docClient.put(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to add item",
        item.info.name,
        ". Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("PutItem succeeded:", item.info.name);
    }
  });
});
