export const parseParams = ({ categoryID: categoryId, geoID: locationId }) => ({
  categoryId,
  locationId
});

export const parseQuery = ({ filter }) => ({ filter });
