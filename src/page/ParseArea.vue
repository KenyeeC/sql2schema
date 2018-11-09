<template>
  <div class="area">
    <p>data</p>
    <div :class="{err: isError}">
    <textarea id="parser" :placeholder="this.placeholder"/>
    </div>
  </div>
</template>

<script>
import CodeMirror from "codemirror/lib/codemirror";
import "codemirror/mode/javascript/javascript";
import util from "../tools/utils";
import jsbeautify from 'js-beautify'

export default {
  props: {
    sql: String,
    isError: Boolean
  },
  data() {
    return {
      placeholder: "根据 Create Table 解析的 json",
      editor: null
    };
  },
  methods: {
    init() {
      this.editor = CodeMirror.fromTextArea(document.getElementById("parser"), {
        mode: "javascript",
        theme: "monokai",
        extraKeys: { Ctrl: "autocomplete" },
        lineWrapping: false
      });
      this.editor.on("change", editor => {
        const value = editor.getValue();
        try {
          const data = JSON.parse(value);
          if (typeof data !== "object") throw TypeError();
          this.buildSchema(data);
          this.$parent.setError("parse-area", false);
        } catch (e) {
          value
            ? this.$parent.setError("parse-area", true)
            : this.$parent.setError("parse-area", false);
        }
      });
    },
    buildSchema(data) {
      this.$parent.build(data);
    },
    parse({val, typemap = null}) {
      try {
        const sql = val || this.sql;
        const result = {
          table: "",
          upperName: "",
          fileds: [],
          types: []
        };
        const tableStep = util.getBracketsBalance(sql);
        const tableName = util.getTableName(tableStep.pre);
        if (tableName) {
          result.table = tableName;
          result.upperName = util.getUpperName(tableName);
        }
        const fields = util.getFields(tableStep.body, typemap);
          result.fileds = fields;
          result.types = util.getTypes(fields);
          this.editor.setValue(jsbeautify(JSON.stringify(result)));
      } catch (e) {
        val || this.sql
          ? this.$parent.setError("sql-area", true)
          : this.$parent.setError("sql-area", false);
      }
    }
  },
  watch: {
    sql(val) {
      this.parse({val});
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style>
</style>
