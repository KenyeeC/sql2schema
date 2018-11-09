<template>
  <div class="area">
    <p>schema</p>
    <textarea id="schema" :placeholder="this.placeholder"/>
  </div>
</template>

<script>
import doT from "dot";
import CodeMirror from "codemirror/lib/codemirror";
import "codemirror/mode/javascript/javascript";

export default {
  props: {
    parseData: Object,
    tmpl: String
  },
  data() {
    return {
      editor: null,
      placeholder: '即将生成的schema, 如需修改生成模板, 可在下面修改, 并保存到 localstorage'
    };
  },
  methods: {
    build() {
      try {
        if (this.parseData) {
          const tmplFn = doT.template(this.tmpl);
          const data = tmplFn(this.parseData)
          this.editor.setValue(data.replace(/\\n/g, `
          
`));
        }
      } catch (e) {
        this.placeholder = this.parseData
          ? "解析数据有误, 请从新输入 SQL 或 直接修改 Data"
          : "即将生成的schema, 如需修改生成模板, 可在下面修改, 并保存到 localstorage";
      }
    }
  },
  watch: {
    parseData() {
      this.build();
    },
    tmpl() {
      this.build();
    }
  },
  mounted() {
    this.editor = CodeMirror.fromTextArea(document.getElementById("schema"), {
      mode: "javascript",
      theme: "monokai",
      extraKeys: { Ctrl: "autocomplete" },
      lineWrapping: true
    });
  }
};
</script>
