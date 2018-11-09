<template>
  <div class="area">
    <p>template&nbsp;&nbsp;
      <a href="http://olado.github.io/doT/" target="blank">查看 doT 语法</a>&nbsp;&nbsp;
      <a href="javascript:void(0)">保存到 localstorage</a>
    </p>
    <textarea id="tmpl"/>
  </div>
</template>

<script>
import schemaTpl from "../assets/schemaTpl.js";
import CodeMirror from "codemirror/lib/codemirror";
import "codemirror/mode/handlebars/handlebars";
export default {
  data() {
    return {
      editor: null
    };
  },
  methods: {
    init() {
      this.setTemplate(schemaTpl);
      this.editor = CodeMirror.fromTextArea(document.getElementById("tmpl"), {
        mode: "handlebars",
        theme: "monokai",
        extraKeys: { Ctrl: "autocomplete" }
      });
      this.editor.setValue(schemaTpl);
      this.editor.on("change", editor => {
        //事件触发后执行事件
        this.setTemplate(editor.getValue());
      });
    },
    setTemplate(tmpl) {
      this.$parent.setTemplate(tmpl);
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
