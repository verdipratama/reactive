import { buildURL } from './url';

function findParentCategories(categories = {}, categoryId) {
  const tree = [];

  if (!categoryId) {
    return tree;
  }

  tree.push(Object.assign({}, categories[categoryId]));

  let parent = Object.values(categories).find(category => {
    if (category.sub_categories) {
      if (category.sub_categories.includes(categoryId)) {
        return category.sub_categories.includes(categoryId);
      }

      const parentCategory = category.sub_categories.find(category => {
        return category.id === categoryId;
      });

      if (parentCategory) {
        return parentCategory;
      }

      return false;
    }

    return false;
  });

  while (parent) {
    tree.push(Object.assign({}, parent));
    parent = Object.values(categories).find(category => {
      if (category.sub_categories) {
        return category.sub_categories.includes(parent.id);
      }

      return false;
    });
  }

  return tree;
}

function getCategoryHeirarchy(flatCategoryMap, categoryId, location, config = { get: () => {} }) {
  const heirarchy = [];
  // @ts-ignore
  const useFakeLevelSlug = config.get('SEO', 'useFakeLevelSlug');
  // @ts-ignore
  const categoryCover = config.get('categoryCover');

  while (categoryId) {
    const category = flatCategoryMap[categoryId];

    if (!category) {
      break;
    }

    heirarchy.unshift({
      text: category.name,
      href: buildURL(
        {
          category,
          location
        },
        { useFakeLevelSlug, categoryCover }
      )
    });

    categoryId = category.parent_id;
  }

  return heirarchy;
}

export { getCategoryHeirarchy, findParentCategories };
