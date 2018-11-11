<template>
  <div class="area setting">
    <p>template&nbsp;&nbsp;
      <a @click="this.toLocal">保存</a>&nbsp;&nbsp;
      <a @click="this.delLocal">还原</a>&nbsp;&nbsp;
      <a class="dot" href="http://olado.github.io/doT/" target="blank">查看 doT 语法</a>
    </p>
    <textarea id="tmpl"/>
  </div>
</template>

<script>
import constant from "../constant";
import CodeMirror from "codemirror/lib/codemirror";
import "codemirror/mode/handlebars/handlebars";
import localstorage from "../tools/localStorage";
const schemaTpl = constant.schemaTpl;
export default {
  data() {
    return {
      editor: null,
      tmpl: schemaTpl,
      storeKey: "tmpl"
    };
  },
  methods: {
    init() {
      this.editor = CodeMirror.fromTextArea(document.getElementById("tmpl"), {
        mode: "handlebars",
        theme: "monokai",
        extraKeys: { Ctrl: "autocomplete" },
        autoRefresh: true
      });
      const storeTmpl = localstorage.get(this.storeKey);
      const tmpl = storeTmpl || schemaTpl;
      this.editor.setValue(tmpl);
      this.setTemplate(tmpl);
      this.editor.on("change", editor => {
        this.setTemplate(editor.getValue());
      });
    },
    setTemplate(tmpl) {
      this.$parent.setTemplate(tmpl);
    },
    toLocal() {
      localstorage.set(this.storeKey, this.editor.getValue());
      this.$parent.setTips("Done!");
    },
    delLocal() {
      const confirm = window.confirm("确定还原?");
      if (!confirm) return;
      localstorage.del(this.storeKey);
      this.editor.setValue(schemaTpl);
      this.$parent.setTips("Done!");
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style>
.dot {
  color: #5a7aca;
}
</style>
