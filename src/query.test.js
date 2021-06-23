import { docClient } from "./dynamodb.mjs";
import { ids } from "./staticIds.mjs";
import test from "ava";
import KSUID from "ksuid";

test("Test KSUID", (t) => {
  t.true(KSUID.isValid(KSUID.parse("1uLWogJfAD980hmP5Khs9YBQMty").buffer));
});

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
        ":skey": "WL#",
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
        ":skey": "IN#" + ids.watchlistId1 + "#TR#",
      },
    })
    .promise();

  t.truthy(result.Items.find((item) => item.sk === ids.transactionId16));
  t.truthy(result.Items.find((item) => item.sk === ids.transactionId15));
  t.truthy(result.Items.find((item) => item.sk === ids.transactionId14));
  t.truthy(result.Items.find((item) => item.sk === ids.transactionId13));
  t.truthy(result.Items.find((item) => item.sk === ids.transactionId12));
  t.truthy(result.Items.find((item) => item.sk === ids.transactionId11));

  t.is(result.Count, 6);
  t.is(result.ScannedCount, 6);
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

// Currently not possible with ULID as the sk
test.skip("get transactions from watchlist1 with pagination", async (t) => {
  const result1 = await docClient
    .query({
      TableName: "Greening",
      KeyConditionExpression: "pk = :pkey and begins_with(sk, :skey)",
      ExpressionAttributeValues: {
        ":pkey": ids.userId,
        ":skey": "IN#" + ids.watchlistId1 + "#TR#",
      },
      Limit: 1,
    })
    .promise();

  t.truthy(result1.Items.find((item) => item.sk === ids.transactionId16));

  t.is(result1.Count, 1);
  t.is(result1.ScannedCount, 1);

  ///////////////////////////////////

  const result2 = await docClient
    .query({
      TableName: "Greening",
      KeyConditionExpression: "pk = :pkey and begins_with(sk, :skey)",
      ExpressionAttributeValues: {
        ":pkey": ids.userId,
        ":skey": "IN#" + ids.watchlistId1 + "#TR#",
      },
      ExclusiveStartKey: {
        sk: result1.LastEvaluatedKey.sk,
        pk: result1.LastEvaluatedKey.pk,
      },
      Limit: 1,
    })
    .promise();

  t.truthy(result2.Items.find((item) => item.sk === ids.transactionId14));

  t.is(result2.Count, 1);
  t.is(result2.ScannedCount, 1);

  ///////////////////////////////////

  const result3 = await docClient
    .query({
      TableName: "Greening",
      KeyConditionExpression: "pk = :pkey and begins_with(sk, :skey)",
      ExpressionAttributeValues: {
        ":pkey": ids.userId,
        ":skey": "IN#" + ids.watchlistId1 + "#TR#",
      },
      ExclusiveStartKey: {
        sk: result2.LastEvaluatedKey.sk,
        pk: result2.LastEvaluatedKey.pk,
      },
      Limit: 1,
    })
    .promise();

  t.truthy(result3.Items.find((item) => item.sk === ids.transactionId11));

  t.is(result3.Count, 1);
  t.is(result3.ScannedCount, 1);
});
