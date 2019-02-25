import _ from 'lodash';

export function filterArrayBySecondArray(data, arrayToCompare, key, propToAdd) {
  console.log(propToAdd)
  return _.map(data, (searchItem) => {
    let followed = _.find(arrayToCompare, (followedItem) => followedItem[key] === searchItem.id);

    return followed
      ? { ...searchItem, [propToAdd]: true }
      : { ...searchItem, [propToAdd]: false }
  })
}