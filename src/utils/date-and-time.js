export const middleDecade = timePeriod => {
  // Return middle decade of a time period. This only makes sense if the time
  // period spans, roughly at least, a few full decades.
  if (!timePeriod) {
    return null;
  }
  const startYear = timePeriod.start.year();
  const endYear = timePeriod.end.year();
  return Math.floor((startYear + endYear) / 20) * 10;
}

