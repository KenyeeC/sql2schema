export default `const { GraphQLObjectType,
{{? it.types.includes('GraphQLInt') }}GraphQLInt,{{? }}
{{? it.types.includes('GraphQLString') }}GraphQLString,{{? }}
 } = require('graphql');
 {{? it.types.includes('GraphQLDateTime') }}
 const { GraphQLDateTime } = require('graphql-iso-date');
 {{? }}

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
      isArg: true,
    },
    {{~}}
  }),
});

module.exports = {{= it.upperName}};`;
