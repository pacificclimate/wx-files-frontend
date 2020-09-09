export const middleDecade = timePeriod => {
  // Return middle decade of a time period. This only makes sense if the time
  // period spans, roughly at least, a few full decades.
  if (!timePeriod) {
    return null;
  }
  const startYear = timePeriod.start.getFullYear();
  const endYear = timePeriod.end.getFullYear();
  return Math.floor((startYear + endYear) / 20) * 10;
}

