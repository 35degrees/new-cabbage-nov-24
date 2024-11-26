import Papa from "papaparse";

export const load = async ({ fetch }) => {
  const res = await fetch("src/routes/0statepop/statePop20202023.csv", {
    headers: {
      "Content-Type": "text/csv",
    },
  });
  let csvPop = await res.text();
  let parsedCsvPop = Papa.parse(csvPop, { header: true });
  console.log(parsedCsvPop);

  return {
    population: parsedCsvPop.data,
  };
};
