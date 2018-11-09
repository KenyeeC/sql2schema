<template>
  <div class="area">
    <p>template&nbsp;&nbsp;
      <a href="http://olado.github.io/doT/" target="blank">查看 doT 语法</a>&nbsp;&nbsp;
      <a href="javascript:void(0)" @click="this.toLocal">保存到 localstorage</a>
    </p>
    <textarea id="tmpl"/>
  </div>
</template>

<script>
import schemaTpl from "../assets/schemaTpl.js";
import CodeMirror from "codemirror/lib/codemirror";
import "codemirror/mode/handlebars/handlebars";
import localstorage from "../tools/localStorage"
export default {
  data() {
    return {
      editor: null,
      tmpl: schemaTpl,
      storeKey: 'tmpl'
    };
  },
  methods: {
    init() {
      this.editor = CodeMirror.fromTextArea(document.getElementById("tmpl"), {
        mode: "handlebars",
        theme: "monokai",
        extraKeys: { Ctrl: "autocomplete" }
      });
      const storeTmpl = localstorage.get(this.storeKey)
      const tmpl = storeTmpl || schemaTpl
      this.editor.setValue(tmpl)
      this.setTemplate(tmpl);
      this.editor.on("change", editor => {
        this.setTemplate(editor.getValue());
      });
    },
    setTemplate(tmpl) {
      this.$parent.setTemplate(tmpl);
    },
    toLocal(){
      this.$parent.setTips('Done!')
      localstorage.set(this.storeKey, this.editor.getValue())
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped>
a {
  color: #333;
  font-size: 12px;
}
</style>
