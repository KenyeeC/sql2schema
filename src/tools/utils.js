import constant from "../constant";
import Parser from "sql-ddl-to-json-schema";
const parser = new Parser("mysql");

const typeMap = constant.getTypeMap();

const parse = {
  prefixSql(sql) {
    let purgeSql = sql.replace(/ON UPDATE CURRENT_TIMESTAMP/g, "");
    if (!purgeSql.endsWith(";")) purgeSql += ";";
    return purgeSql;
  },
  ddlToJson(sql) {
    parser.feed(parse.prefixSql(sql));
    const parsedJsonFormat = parser.results;
    const [compactJsonTablesArray] = parser.toCompactJson(parsedJsonFormat);
    return compactJsonTablesArray;
  },
  simplifySchema(schema, customTypeMap) {
    const tm = customTypeMap || typeMap;
    console.log("schema:", schema);
    const result = {};
    result.table = schema.name;
    result.upperName = toCamelName(schema.name, 0);
    result.primaryKey = schema.primaryKey
      ? schema.primaryKey.columns[0].column
      : "id";
    result.fields = schema.columns.map(e => {
      const f = {};
      f.name = e.name;
      f.camelName = toCamelName(e.name);
      f.datatype = e.type.datatype;
      f.type = Object.keys(tm)
        .filter(key => tm[key].includes(e.type.datatype))
        .join("");
      f.length = e.type.width || e.type.length || e.type.fractional || 0;
      f.comment =
        e.options && e.options.comment
          ? e.options.comment
          : toCamelName(e.name);
      f.options = { ...e.options, ...e.type };
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
  },
  formatSchema(schema) {
    return `${schema}`
      .replace(
        /\\n/g,
        `
          
`
      )
      .replace(
        /sqlDatabase: 'Your_Datebase_Name',/,
        `sqlDatabase: 'Your_Datebase_Name',// 可在下面 setting 的 template 处修改成你的数据库名称并保存
`
      );
  }
};

function toCamelName(str, startIndex = 1) {
  return str
    .split("_")
    .filter(e => e)
    .map((e, index) => {
      const temp = e.split("");
      if (index >= startIndex) temp[0] = `${temp[0]}`.toUpperCase();
      return temp.join("");
    })
    .join("");
}

export default parse;
