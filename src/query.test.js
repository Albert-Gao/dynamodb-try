import { docClient } from "./dynamodb.mjs";
import { ids } from "./staticIds.mjs";
import test from "ava";

test("get user only", async (t) => {
  const result = await docClient
    .query({
      TableName: "Greening",
      KeyConditionExpression: "pk = :pkey and sk = :skey",
      ExpressionAttributeValues: {
        ":pkey": ids.userId,
        ":skey": ids.userId,
      },
    })
    .promise();

  t.is(result.Items[0].pk, ids.userId);
  t.is(result.Items[0].sk, ids.userId);
  t.is(result.Count, 1);
});

test("get watchlists only", async (t) => {
  const result = await docClient
    .query({
      TableName: "Greening",
      KeyConditionExpression: "pk = :pkey and begins_with(sk, :skey)",
      ExpressionAttributeValues: {
        ":pkey": ids.userId,
        ":skey": "wl#",
      },
    })
    .promise();

  t.truthy(result.Items.find((item) => item.sk === ids.watchlistId1));
  t.truthy(result.Items.find((item) => item.sk === ids.watchlistId2));
  t.truthy(result.Items.find((item) => item.sk === ids.watchlistId3));

  t.is(result.Count, 3);
  t.is(result.ScannedCount, 3);
});

test("get 1 watchlist only", async (t) => {
  const result = await docClient
    .query({
      TableName: "Greening",
      KeyConditionExpression: "pk = :pkey and sk = :skey",
      ExpressionAttributeValues: {
        ":pkey": ids.userId,
        ":skey": ids.watchlistId2,
      },
    })
    .promise();

  t.truthy(result.Items.find((item) => item.sk === ids.watchlistId2));

  t.is(result.Count, 1);
  t.is(result.ScannedCount, 1);
});

test("get transactions from watchlist1 only", async (t) => {
  const result = await docClient
    .query({
      TableName: "Greening",
      KeyConditionExpression: "pk = :pkey and begins_with(sk, :skey)",
      ExpressionAttributeValues: {
        ":pkey": ids.userId,
        ":skey": "in#" + ids.watchlistId1 + "#tr#",
      },
    })
    .promise();

  t.truthy(result.Items.find((item) => item.sk === ids.transactionId11));
  t.truthy(result.Items.find((item) => item.sk === ids.transactionId12));
  t.truthy(result.Items.find((item) => item.sk === ids.transactionId13));

  t.is(result.Count, 3);
  t.is(result.ScannedCount, 3);
});

test("get 1 transaction from watchlist1 only", async (t) => {
  const result = await docClient
    .query({
      TableName: "Greening",
      KeyConditionExpression: "pk = :pkey and sk = :skey",
      ExpressionAttributeValues: {
        ":pkey": ids.userId,
        ":skey": ids.transactionId11,
      },
    })
    .promise();

  t.truthy(result.Items.find((item) => item.sk === ids.transactionId11));

  t.is(result.Count, 1);
  t.is(result.ScannedCount, 1);
});
