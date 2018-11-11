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
import {js as jsbeautify} from "js-beautify";

export default {
  props: {
    parseData: Object,
    tmpl: String
  },
  data() {
    return {
      editor: null,
      placeholder: `即将生成的schema, 如需修改生成模板, 点击下面 Setting`
    };
  },
  methods: {
    build() {
      try {
        if (this.parseData) {
          const tmplFn = doT.template(this.tmpl);
          const data = tmplFn(this.parseData).replace(/\\n/g, `
          
`)
          this.editor.setValue(jsbeautify(data, {indent_size: 2}))
        }
      } catch (e) {
        // Do nothing
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
      lineWrapping: false
    });
  }
};
</script>
