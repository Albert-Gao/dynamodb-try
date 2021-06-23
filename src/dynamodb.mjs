import AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-1",
  endpoint: "http://localhost:8000",
});

export const docClient = new AWS.DynamoDB.DocumentClient();
export const dynamodb = new AWS.DynamoDB();
