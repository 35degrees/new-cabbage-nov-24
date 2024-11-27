import Papa from "papaparse";

export const load = async ({ fetch }) => {
  const res = await fetch("src/routes/1cataxrev/PAYEMS.csv", {
    headers: {
      "Content-Type": "text/csv",
    },
  });
  let csvEmpl = await res.text();
  let parsedCsvEmpl = Papa.parse(csvEmpl, { header: true });
  console.log(parsedCsvEmpl);

  return {
    employees: parsedCsvEmpl.data,
  };
};
