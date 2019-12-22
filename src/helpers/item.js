/**
 * Returns the total of selected levels to show from the location strinfigied.
 * @param {Array} levels - Levels available
 * @param {Number} levelsToShow - the first X levels that will be shown from location
 */
const getItemLocationString = (levels, levelsToShow) => {
  const selectedLevels = levels.slice(0, levelsToShow);
  const locationsArray = selectedLevels.map(elm => elm);

  return locationsArray.join(', ');
};

/**
 * Processes the mapping from the config and prioritizes
 * the order in which the locations will be shown
 * Order: NEIGHBOURHOOD -> CITY -> STATE -> COUNTRY
 * @param {Object} currentItem - current item being iterated
 * @param {Number} levelsToShow - number of selected levels
 */
const getItemLocation = (currentItem, levelsToShow = 2) => {
  const locations = currentItem.locations_resolved;
  const possibleLevelsToShow = locations && locations.prioritizedLevels;

  if (!locations || !possibleLevelsToShow || !possibleLevelsToShow.length) {
    return '';
  }

  return getItemLocationString(possibleLevelsToShow, levelsToShow);
};

const getItemSubsetData = item => {
  let returnParams = {};

  if (item) {
    returnParams = {
      adId: item.id,
      status: item.status.status,
      categoryId: item.category_id,
      imageCount: item.images.length,
      locations: {
        neighbourhoodId: item.locations[0].district_id,
        cityId: item.locations[0].city_id,
        stateId: item.locations[0].region_id
      }
    };
  }
  return returnParams;
};

export { getItemLocation, getItemSubsetData };
