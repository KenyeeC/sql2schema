import localStorage from "./tools/localStorage";

const typemapKey = "typemap";

export default {
  typemapKey,
  getTypeMap: () => {
    const data = localStorage.get(typemapKey);
    if (data) return data;
    return {
      GraphQLInt: ["int", "tinyint"],
      GraphQLString: ["varchar", "text"],
      GraphQLDateTime: ["timestamp"]
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
  sqlDatabase: 'picture_book',
  sqlTable: '{{= it.table}}',
  uniqueKey: 'id',
  fields: () => ({
    {{~ it.fileds :field}}
    {{= field.camelName }}: {
      type: {{= field.type}},
      description: '{{= field.comment}}',
      sqlColumn: '{{= field.name}}',
      isArg: true
    },
    {{~}}
  })
});
module.exports = {{= it.upperName}};`
};
