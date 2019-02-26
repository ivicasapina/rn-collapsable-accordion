import _ from 'lodash';

const tournaments = [
  {
    id: 1,
    countryId: 1,
    name: 'Bundesliga'
  },
  {
    id: 2,
    countryId: 1,
    name: 'Bundesliga 2'
  },
  {
    id: 3,
    countryId: 1,
    name: 'Bundesliga 3'
  },
  {
    id: 4,
    countryId: 2,
    name: 'Premier league'
  },
  {
    id: 5,
    countryId: 2,
    name: 'Championship'
  }
]

export function getTournamentsByCountryId(countryId) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      const data = _.filter(tournaments, { countryId })
      resolve(data);
    }, 1000);
  });
}