import localStorage from "./tools/localStorage";

const typemapKey = "typemap";

export default {
  typemapKey,
  getTypeMap: () => {
    const data = localStorage.get(typemapKey);
    if (data) return data;
    return {
      GraphQLInt: [
        "tinyint",
        "smallint",
        "mediumint",
        "int",
        "float",
        "double",
        "real",
        "decimal"
      ],
      GraphQLString: [
        "bigint",
        "char",
        "varchar",
        "tinytext",
        "text",
        "mediumtext",
        "longtext"
      ],
      GraphQLDateTime: ["date", "time", "datetime", "timestamp", "year"]
    };
  },
  schemaTpl: `const { GraphQLObjectType
    {{? it.types.includes('GraphQLInt') }},GraphQLInt{{? }}
    {{? it.types.includes('GraphQLString') }},GraphQLString{{? }}} = require('graphql');
  {{? it.types.includes('GraphQLDateTime') }}
  const { GraphQLDateTime } = require('graphql-iso-date');
  {{? }}
\\n
const {{= it.upperName}} = new GraphQLObjectType({
  description: '{{= it.upperName}}',
  name: '{{= it.upperName}}',
  sqlDatabase: 'Your_Datebase_Name', /* 此处可修改成你的数据库名称 */
  sqlTable: '{{= it.table}}',
  uniqueKey: '{{= it.primaryKey}}',
  fields: () => ({
    {{~ it.fields :field}}
    {{= field.camelName }}: {
      type: {{= field.type}},
      description: '{{= field.comment}}',
      sqlColumn: '{{= field.name}}',
      isArg: true
    },
    {{~}}
  })
});
module.exports = {{= it.upperName}};`,
  preset: {
    sql: `-- 修改或替换下面内容即可生成 schema --

CREATE TABLE table_name (
  id int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  create_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  update_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  status tinyint(1) DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='DEMO';`
  }
};
