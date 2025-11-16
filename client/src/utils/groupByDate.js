export default function groupByDateModified(folders) {
  const now = new Date();
  
  const ONE_DAY = 1000 * 60 * 60 * 24;
  const ONE_WEEK = ONE_DAY * 7;

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  const groups = {
    "Last week": [],
    "Earlier this month": [],
    "Last month": [],
    "Earlier this year": [],
    "Last year": [],
    "Older": [],
  };

  for (const f of folders) {
    const t = new Date(f.modified);

    if (now - t <= ONE_WEEK) {
      groups["Last week"].push(f);
    }
    else if (t >= startOfMonth) {
      groups["Earlier this month"].push(f);
    }
    else if (t >= lastMonth && t < startOfMonth) {
      groups["Last month"].push(f);
    }
    else if (t >= startOfYear) {
      groups["Earlier this year"].push(f);
    }
    else if (t.getFullYear() === now.getFullYear() - 1) {
      groups["Last year"].push(f);
    }
    else {
      groups["Older"].push(f);
    }
  }

  return groups;
}
