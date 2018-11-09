<template>
  <div id="app">
    <h2>SQL to Schema</h2>
    <div class="container">
      <SqlArea :isError="this.isError['sql-area']" />
      <SchemaArea :parseData="parseData" :tmpl="tmpl"/>
    </div>
    <div class="container">
      <ParseArea ref="parse" :sql="sql" :isError="this.isError['parse-area']"/>
      <TemplateArea :class="{hide: this.setting.area !== 'template'}" />
      <TypeconfigArea :class="{hide: this.setting.area !== 'typeconfig'}" />
    </div>
    <Tips ref="tips" />
  </div>
</template>

<script>
import TemplateArea from "./page/TemplateArea.vue";
import TypeconfigArea from "./page/TypeconfigArea.vue";
import SqlArea from "./page/SqlArea.vue";
import SchemaArea from "./page/SchemaArea.vue";
import ParseArea from "./page/ParseArea.vue";
import Tips from "./component/Tips.vue";
import "./tools/placeholder";
import "./tools/format";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";


export default {
  name: "app",
  components: {
    TemplateArea,
    TypeconfigArea,
    SqlArea,
    SchemaArea,
    ParseArea,
    Tips
  },
  data() {
    return {
      isError: {
        "sql-area": false,
        "parse-area": false,
        "template-area": false,
        "schema-area": false
      },
      sql: "",
      parseData: {},
      tmpl: "",
      setting:{
        area: 'template'
      }
    };
  },
  methods: {
    parse(sql) {
      this.sql = sql;
    },
    reparse(typemap){
      this.$refs.parse.parse({typemap})
    },
    build(parseData) {
      if (typeof parseData === "object") this.parseData = parseData;
    },
    setTemplate(tmpl) {
      this.tmpl = tmpl;
    },
    setError(area, boolean) {
      this.isError[area] = boolean;
    },
    setTips(tips){
      this.$refs.tips.show(tips)
    },
    toggleSetting(area){
      this.setting.area = area
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 14px;
  color: #2c3e50;
  margin-top: 20px;
}
h2 {
  margin: 0;
}
.container {
  display: flex;
  justify-content: space-around;
}
.area {
  text-align: left;
  width: 45%;
  height: 500px;
  font-size: "14px";
}
.area > p {
  font-size: 18px;
  margin: 17px 0px 10px 0;
  text-align: left;
}
.err {
  outline: 5px solid #c22;
}
.CodeMirror {
  height: 450px;
}
.CodeMirror pre.CodeMirror-placeholder {
  color: #999;
}
.hide{
  display: none
}
a {
  color: #333;
  font-size: 12px;
  text-decoration-line: underline;
  cursor: pointer;
}
.toggle{
  float: right;
  font-size: 18px;
}
</style>
