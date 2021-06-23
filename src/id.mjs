import KSUID from "ksuid";
import { ulid } from "ulid";

function combineIds(ids) {
  let result = "";

  ids.forEach((id) => {
    if (!result) {
      result = id;
    } else {
      result += "#" + id;
    }
  });

  return result;
}

const getId = () =>
  //KSUID.randomSync().string;
  ulid();

const id = {
  create: {
    user: () => "U#" + getId(),
    watchlist: () => "WL#" + getId(),
    transaction: (wlId) => combineIds(["IN", wlId, "TR#" + getId()]),
  },
};

const userId = id.create.user();

const watchlistId1 = id.create.watchlist();
const watchlistId2 = id.create.watchlist();
const watchlistId3 = id.create.watchlist();

const transactionId11 = id.create.transaction(watchlistId1);
const transactionId12 = id.create.transaction(watchlistId1);
const transactionId13 = id.create.transaction(watchlistId1);
const transactionId14 = id.create.transaction(watchlistId1);
const transactionId15 = id.create.transaction(watchlistId1);
const transactionId16 = id.create.transaction(watchlistId1);

const transactionId21 = id.create.transaction(watchlistId2);
const transactionId22 = id.create.transaction(watchlistId2);
const transactionId23 = id.create.transaction(watchlistId2);

export const ids = {
  userId,

  watchlistId1,
  watchlistId2,
  watchlistId3,

  transactionId11,
  transactionId12,
  transactionId13,
  transactionId14,
  transactionId15,
  transactionId16,
  
  transactionId21,
  transactionId22,
  transactionId23,
};

console.log(ids);
