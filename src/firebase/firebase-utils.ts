import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import type {
  AggregateQuerySnapshot,
  AggregateField,
} from "firebase/firestore";
import { db } from "../App";

export const productTypes = {
  mobile: "Mobile",
  laptop: "Laptop",
  tablet: "Tablet",
  desktop: "Desktop",
};

export const modes = {
  online: "Online",
  offline: "Offline",
};

export type ProductTypeCount = {
  [key in keyof typeof productTypes]: number;
};

export const productTypesData = async (
  startDate = new Date(2022, 0, 1)
): Promise<ProductTypeCount> => {
  const productTypeCount: ProductTypeCount = {
    mobile: 0,
    laptop: 0,
    tablet: 0,
    desktop: 0,
  };

  // make a firebase query to get the count of each product types
  const _date = startDate.toISOString().split("T")[0];

  const qGen = (productType: String) =>
    query(
      collection(db, "sales"),

      where("product", "==", productType)
    );

  const promises = Object.entries(productTypes).map(async (product) => {
    const q = qGen(product[1]);
    return getCountFromServer(q);
  });

  const snapshots = await Promise.all(promises);

  snapshots.forEach((snapshot, index) => {
    const product = Object.entries(productTypes)[index];
    //@ts-ignore
    productTypeCount[product[0]] = snapshot.data().count;
  });

  return productTypeCount;
};

export const modesData = async () => {
  const modeCount = {
    online: 0,
    offline: 0,
  };

  const qGen = (mode: String) =>
    query(collection(db, "sales"), where("mode", "==", mode));

  const promises = Object.entries(modes).map((mode) => {
    const q = qGen(mode[1]);
    return getCountFromServer(q);
  });

  const snapshots = await Promise.all(promises);

  snapshots.forEach((snapshot, index) => {
    //@ts-ignore
    modeCount[Object.keys(modes)[index]] = snapshot.data().count;
  });

  return modeCount;
};

export const salesMetrics = async () => {
  let costPurchaseCount = {
    "<= 10000": 0,
    "<= 20000": 0,
    "<= 30000": 0,
    "<= 40000": 0,
    "<= 50000": 0,
    "<= 60000": 0,
    "<= 70000": 0,
  };

  const qGen = (cost: number, prevCost: number) =>
    query(
      collection(db, "sales"),
      where("amount", ">", prevCost),
      where("amount", "<=", cost)
    );

  const promises: Promise<
    AggregateQuerySnapshot<{
      count: AggregateField<number>;
    }>
  >[] = [];

  for (let i = 0; i < Object.entries(costPurchaseCount).length; i++) {
    let cost = Object.entries(costPurchaseCount)[i];
    const currCost = parseInt(cost[0].split(" ")[1]);
    const prevCost =
      i === 0
        ? 0
        : parseInt(Object.entries(costPurchaseCount)[i - 1][0].split(" ")[1]);

    const q = qGen(currCost, prevCost);

    promises.push(getCountFromServer(q));
  }

  const snapshots = await Promise.all(promises);

  snapshots.forEach((snapshot, index) => {
    //@ts-ignore
    costPurchaseCount[Object.keys(costPurchaseCount)[index]] =
      snapshot.data().count;
  });

  // do for > 70000
  const q = query(collection(db, "sales"), where("amount", ">", 70000));
  const sanpshot = await getCountFromServer(q);

  costPurchaseCount = Object.assign(costPurchaseCount, {
    "> 70000": sanpshot.data().count,
  });

  return costPurchaseCount;
};
