<template>
  <div id="app">
    <h2>SQL to Schema</h2>
    <div class="container">
      <SqlArea :isError="this.isError['sql-area']" />
      <SchemaArea :parseData="parseData" :tmpl="tmpl"/>
    </div>
    <h2 id="setting" :class="[this.setting ? 'open': 'close']" @click="this.toggleSetting">Setting</h2>
    <div class="container" :class="{hide: !this.setting}">
      <TypeconfigArea  />
      <ParseArea ref="parse" :sql="sql" :isError="this.isError['parse-area']"/>
      <TemplateArea />
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
import { setTimeout, clearTimeout } from "timers";

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
      setting: false
    };
  },
  methods: {
    parse(sql) {
      this.sql = sql;
    },
    reparse(typemap) {
      this.$refs.parse.parse({ typemap });
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
    setTips(tips) {
      this.$refs.tips.show(tips);
    },
    toggleSetting() {
      this.setting = !this.setting;
      if (this.setting) {
        const timmer = setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight);
          clearTimeout(timmer);
        }, 30);
      } else {
        window.scrollTo(0, 0);
      }
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
#setting {
  margin: 30px 0px 15px 0;
  cursor: pointer;
  position: relative;
}
.open:after {
  content: "";
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-left: 53px;
  width: 0;
  height: 0;
  border-width: 10px 8px 0;
  border-style: solid;
  border-color: #2c3e50 transparent transparent;
}
.close:after {
  content: "";
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-left: 53px;
  width: 0;
  height: 0;
  border-width: 0 8px 10px;
  border-style: solid;
  border-color: transparent transparent #2c3e50;
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
  height: 700px;
  font-size: "14px";
}
.setting {
  width: 32%;
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
  height: 650px;
}
.CodeMirror pre.CodeMirror-placeholder {
  color: #999;
}
.hide {
  position: fixed;
  left: 500%;
}
a {
  color: #333;
  font-size: 12px;
  text-decoration-line: underline;
  cursor: pointer;
}
.toggle {
  float: right;
  font-size: 18px;
}
</style>
