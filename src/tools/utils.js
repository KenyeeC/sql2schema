import balanced from "balanced-match";
import constant from "../constant";

const typeMap = constant.getTypeMap();
const singleQuotes = /`.+?`/;

export default {
  getBracketsBalance(str) {
    return balanced("(", ")", str);
  },
  getTableName(str) {
    const data = str.match(singleQuotes);
    return data ? purge(data[0], "`") : data;
  },
  getFields(body, customTypeMap) {
    const fields = body.split("\n");
    const tm = customTypeMap || typeMap;
    return fields
      .map(f => {
        f = purge(f, "\\'");
        f = purge(f, "`");
        f = f.split(/ /g).filter(e => e);
        const name = f[0];
        if (name === "PRIMARY" || name === "KEY" || name === "UNIQUE" || !name)
          return null;
        let comment = name;
        const type = f[1].replace(/\(.*\)/g, "");
        const commentIdx = f.indexOf("COMMENT");
        if (commentIdx > -1) comment = purge(f[commentIdx + 1], ",");
        return {
          name,
          camelName: toCamelName(name),
          type: Object.keys(tm)
            .filter(key => tm[key].includes(type))
            .join(""),
          comment
        };
      })
      .filter(e => e);
  },
  getTypes(fields) {
    const result = [];
    fields.forEach(e => {
      if (!result.includes(e.type)) result.push(e.type);
    });
    return result;
  },
  getUpperName(str) {
    return toCamelName(str, 0);
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

function purge(text, symbol) {
  const reg = new RegExp(symbol, "g");
  return text.replace(reg, "");
}
