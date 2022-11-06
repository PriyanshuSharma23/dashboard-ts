import { collection, writeBatch, doc, Timestamp } from "firebase/firestore";
import { db } from "../App";

const generateSales = () => {
  const sales = [];
  const start = new Date(2022, 0, 1);
  const end = new Date(2022, 10, 5);

  const productTypes = ["Mobile", "Laptop", "Tablet", "Desktop"];

  const modes = ["Online", "Offline"];

  const amounts = [
    4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000,
    15000, 16000, 17000, 18000, 19000, 20000, 21000, 22000, 23000, 24000, 25000,
    26000, 27000, 28000, 29000, 30000, 31000, 32000, 33000, 34000, 35000, 36000,
    37000, 38000, 39000, 40000, 41000, 42000, 43000, 44000, 45000, 46000, 47000,
    48000, 49000, 50000, 51000, 52000, 53000, 54000, 55000, 56000, 57000, 58000,
    59000, 60000, 61000, 62000, 63000, 64000, 65000, 66000, 67000, 68000, 69000,
    70000, 71000, 72000,
  ];

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  let date = start;
  while (date <= end) {
    const saleCount = Math.floor(Math.random() * 10) + 3;
    for (let i = 0; i < saleCount; i++) {
      const sale = {
        date: Timestamp.fromDate(date),
        amount: amounts[getRandomInt(amounts.length)],
        product: productTypes[getRandomInt(productTypes.length)],
        mode: modes[getRandomInt(modes.length)],
      };
      sales.push(sale);
    }
    date.setDate(date.getDate() + 1);
  }

  return sales;
};

// populate sales collection with mock data
export const populateSales = async () => {
  const sales = generateSales();
  //   const batch = writeBatch(db);
  const salesRef = collection(db, "sales");

  // make sections of 500 sales
  const sections = [];

  let section = [];
  for (let i = 0; i < sales.length; i++) {
    section.push(sales[i]);
    if (section.length === 500) {
      sections.push(section);
      section = [];
    }
  }
  sections.push(section);

  //   await batch.commit();
  // make a batch for each section
  for (let i = 0; i < sections.length; i++) {
    const batch = writeBatch(db);
    for (let j = 0; j < sections[i].length; j++) {
      const sale = sections[i][j];
      const saleRef = doc(salesRef);
      batch.set(saleRef, sale);
    }
    await batch.commit();
  }

  console.log(sections);
};
