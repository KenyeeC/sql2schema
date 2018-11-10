import constant from "../constant";
import Parser from "sql-ddl-to-json-schema";
const parser = new Parser("mysql");

const typeMap = constant.getTypeMap();

const parse = {
  ddlToJson(sql) {
    parser.feed(sql);
    const parsedJsonFormat = parser.results;
    const [compactJsonTablesArray] = parser.toCompactJson(parsedJsonFormat);
    return compactJsonTablesArray;
  },
  simplifySchema(schema, customTypeMap) {
    const tm = customTypeMap || typeMap;
    const result = {};
    result.table = schema.name;
    result.upperName = toCamelName(schema.name, 0);
    result.fields = schema.columns.map(e => {
      const f = {};
      f.name = e.name;
      f.camelName = toCamelName(e.name);
      f.type = Object.keys(tm)
        .filter(key => tm[key].includes(e.type.datatype))
        .join("");
      f.comment =
        e.options && e.options.comment
          ? e.options.comment
          : toCamelName(e.name);
      return f;
    });
    result.types = parse.getTypes(result.fields);
    return result;
  },
  getTypes(fields) {
    const result = [];
    fields.forEach(e => {
      if (!result.includes(e.type)) result.push(e.type);
    });
    return result.filter(e => e);
  }
};

function toCamelName(str, startIndex = 1) {
  return str
    .split("_")
    .map((e, index) => {
      const temp = e.split("");
      if (index >= startIndex) temp[0] = `${temp[0]}`.toUpperCase();
      return temp.join("");
    })
    .join("");
}

export default parse;
