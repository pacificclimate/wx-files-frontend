let fileId = 0;

function makeFileCommon() {
  fileId += 1;
  return {
    id: `${fileId}`,
    selfUri: `/files/${fileId}`,
    contentUri: `/files/${fileId}/content`,
  }
}

function makeWxFile(tStart, tEnd) {
  return {
    ...makeFileCommon(),
    fileType: "weather",
    dataSource: "CWEC2016",
    designDataType: "TMY",
    scenario: "RCP8.5",
    timePeriod: {
      start: new Date(tStart),
      end: new Date(tEnd),
    },
    ensembleStatistic: "median",
    variables: "all thermodynamic",
    anomaly: "daily",
    smoothing: "21",
  };
}

function makeSummaryFile() {
  return {
    ...makeFileCommon(),
    fileType: "summary",
  };
}


let locationId = -1;

function makeLocation(
  city, province, country, code, latitude, longitude, elevation
) {
  locationId += 1;
  return {
    id: `${locationId}`,
    selfUri: `/locations/${locationId}`,
    name: `${city},${province},${country}`,
    city,
    province,
    country,
    code,
    latitude,
    longitude,
    elevation,
    files: [
      makeWxFile("2010-01-01", "2039-12-31"),
      makeWxFile("2040-01-01", "2069-12-31"),
      makeWxFile("2070-01-01", "2099-12-31"),
      makeSummaryFile(),
    ],
  }
}

export default [
  makeLocation("Abbotsford Intl AP", "BC", "CAN", "711080", 49.02530, -122.3600, 59.1,),
  makeLocation("Agassiz", "BC", "CAN", "711130", 49.24310, -121.7603, 19.3,),
  makeLocation("Blue River AP", "BC", "CAN", "718830", 52.12910, -119.2895, 682.8,),
  makeLocation("Bonilla Island", "BC", "CAN", "714840", 53.49280, -130.6390, 12.5,),
];