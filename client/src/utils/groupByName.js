export default function groupByName(folders) {
  const groups = {
    "0–9": [],
    "A–H": [],
    "I–P": [],
    "Q–Z": [],
    "Other": [],
  };

  for (const f of folders) {
    const firstChar = f.name[0].toUpperCase();

    if (/[0-9]/.test(firstChar)) groups["0–9"].push(f);
    else if (firstChar >= "A" && firstChar <= "H") groups["A–H"].push(f);
    else if (firstChar >= "I" && firstChar <= "P") groups["I–P"].push(f);
    else if (firstChar >= "Q" && firstChar <= "Z") groups["Q–Z"].push(f);
    else groups["Other"].push(f);
  }

  return groups;
}
