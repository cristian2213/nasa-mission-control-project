const launches = new Map();
let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customer: ['NASA', 'ZTM'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

function abortyLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(lanch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(lanch, {
      success: true,
      upcoming: true,
      customer: ['ZTM', 'CHR'],
      flightNumber: latestFlightNumber,
    })
  );
}

module.exports = {
  launches,
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortyLaunchById,
};
