import { docClient } from "./dynamodb.mjs";
import { ids } from "./staticIds.mjs";

// EQUAL Query
// const params = {
//   TableName: "Greening",
//   KeyConditionExpression: "#pk = :pkey and #sk = :skey",
//   ExpressionAttributeNames: {
//     "#pk": "pk",
//     "#sk": "sk",
//   },
//   ExpressionAttributeValues: {
//     ":pkey": userId,
//     ":skey": watchlistId1,
//   },
//   ScanIndexForward: true,
// };

docClient.query(
  {
    TableName: "Greening",
    KeyConditionExpression: "pk = :pkey and begins_with(sk, :skey)",
    ExpressionAttributeValues: {
      ":pkey": ids.userId,
      ":skey": ids.watchlistId1,
    },
  },
  function (err, data) {
    if (err) {
      console.error(
        "[ERROR] Unable to read item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("Get watchlist1:", JSON.stringify(data.Items, null, 2));
      console.log("length===1", data.Count === 1);
    }
  }
);

console.log("\n\n");

docClient.query(
  {
    TableName: "Greening",
    KeyConditionExpression: "pk = :pkey",
    ExpressionAttributeValues: {
      ":pkey": ids.userId,
    },
  },
  function (err, data) {
    if (err) {
      console.error(
        "[ERROR] Unable to read item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("Get user:", JSON.stringify(data.Items, null, 2));
      console.log("length===3", data.Count === 3);
    }
  }
);

console.log("\n\n");
