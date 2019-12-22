/* global window */

import { resolve } from './objects';

const getSchema = (schemas, schema, data) => {
  if (schema.switch) {
    const switchKey = resolve(data, schema.switch.key);
    const values = schema.switch.values;

    if (Object.keys(values).includes(switchKey) && !values[switchKey]) {
      return null;
    }
    if (schemas[values[switchKey]]) {
      return schemas[values[switchKey]];
    }
    for (let i = 0; i < data.parentCategories.length; i++) {
      const category = data.parentCategories[i];

      if (schemas[values[category.id]]) {
        return schemas[values[category.id]];
      }
    }
    return schemas[values.default];
  }
  return schema;
};

const parseSchemas = (schemas, data, initialKey) => {
  const replaceString = field => {
    if (field.match(/{{schema.(.*?)}}/)) {
      return parseSchema(field.match(/{{schema.(.*?)}}/)[1]); // eslint-disable-line no-use-before-define
    }
    if (field.match(/{{!data.(.*?)}}/)) {
      const value = field.replace(/{{!data.(.*?)}}/g, (_, matchedKey) => resolve(data, matchedKey));

      if (!value) {
        throw new Error('Missing required field');
      }
      return value;
    }
    return field.replace(/{{data.(.*?)}}/g, (_, matchedKey) => resolve(data, matchedKey));
  };
  const replaceValue = schema => {
    if (!schema) {
      return null;
    }
    if (typeof schema === 'string') {
      return replaceString(schema);
    }
    if (Array.isArray(schema)) {
      return schema.map(replaceValue);
    }
    const result = {};

    Object.keys(schema).forEach(fieldKey => {
      const field = schema[fieldKey];

      result[fieldKey] = replaceValue(field);
    });
    return result;
  };
  const parseSchema = schemaKey => {
    try {
      return replaceValue(getSchema(schemas, schemas[schemaKey], data));
    } catch (err) {
      throw new Error(`${err.message}. Schema key ${schemaKey}`);
    }
  };

  try {
    return parseSchema(initialKey);
  } catch (err) {
    if (typeof window !== 'undefined' && window.newrelic) {
      window.newrelic.addPageAction('item_parse_schema_error', { err });
    }
  }
  return null;
};

export { parseSchemas };
