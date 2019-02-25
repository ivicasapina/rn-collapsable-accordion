import _ from 'lodash';

export async function translateItemsAsync(data, language, nestedProperty = null) {
  if (language === 'en-EN') {
    return data;
  } else {
    return await data.map(item => {
      let nested = {};
      if (nestedProperty !== null) {
        nested = {
          [nestedProperty]: [
            ...item[nestedProperty].map(i => {
              console.log(i)
              if (i.hasOwnProperty('languageMetadata') && i.languageMetadata !== null) {
                return {
                  ...i,
                  name: i['languageMetadata'][language].name
                }
              }
              return i;
            })
          ]
        }
      }

      return {
        ...item,
        name: (item.hasOwnProperty('languageMetadata') && item.languageMetadata !== null) ? item['languageMetadata'][language].name : item.name,
        ...nested
      };
    })
  }
}

export async function translateItemAsync(item, language, nestedProperty = null) {
  if (language === 'en-EN') {
    return item
  }
  else {
    let nested = {};
    if (nestedProperty !== null &&
      item.hasOwnProperty(nestedProperty) &&
      item[nestedProperty].hasOwnProperty('languageMetadata') &&
      item[nestedProperty]['languageMetadata'] !== null) {
      nested = {
        [nestedProperty]: {
          ...item[nestedProperty],
          name: item[nestedProperty]['languageMetadata'][language].name
        }
      }
    }

    return {
      ...item,
      name: item['languageMetadata'] !== null ? item['languageMetadata'][language].name : item.name,
      ...nested
    }
  }
}