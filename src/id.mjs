import KSUID from "ksuid";

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

const id = {
  create: {
    user: () => "u#" + KSUID.randomSync(),
    watchlist: () => "wl#" + KSUID.randomSync(),
    transaction: (wlId) => combineIds(["in", wlId, "tr#" + KSUID.randomSync()]),
  },
};

const userId = id.create.user();

const watchlistId1 = id.create.watchlist();
const watchlistId2 = id.create.watchlist();
const watchlistId3 = id.create.watchlist();

export const ids = {
  userId,

  watchlistId1,
  watchlistId2,
  watchlistId3,

  transactionId11: id.create.transaction(watchlistId1),
  transactionId12: id.create.transaction(watchlistId1),
  transactionId13: id.create.transaction(watchlistId1),

  transactionId21: id.create.transaction(watchlistId2),
  transactionId22: id.create.transaction(watchlistId2),
  transactionId23: id.create.transaction(watchlistId2),
};

console.log(ids);