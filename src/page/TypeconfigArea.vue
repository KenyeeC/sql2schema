<template>
  <div class="area">
    <p>type config&nbsp;&nbsp;
      <a @click="this.toLocal">保存</a>&nbsp;&nbsp;
      <a @click="this.delLocal">还原</a>
      <a class="toggle" @click="this.toggleSetting">template</a>
    </p>
    <textarea id="typeconfig"/>
  </div>
</template>

<script>
import CodeMirror from "codemirror/lib/codemirror";
import "codemirror/mode/handlebars/handlebars";
import localstorage from "../tools/localStorage";
import constant from "../constant";
import {js as jsbeautify} from "js-beautify";

export default {
  data() {
    return {
      editor: null,
      storeKey: constant.typemapKey
    };
  },
  methods: {
    init() {
      this.editor = CodeMirror.fromTextArea(
        document.getElementById("typeconfig"),
        {
          mode: "javascript",
          theme: "monokai",
          extraKeys: { Ctrl: "autocomplete" },
          lineWrapping: true
        }
      );
      const typemap = constant.getTypeMap();
      this.editor.setValue(jsbeautify(JSON.stringify(typemap), {indent_size: 2}));
      this.editor.on("change", editor => {
        try {
          const typemap = JSON.parse(this.editor.getValue());
          this.$parent.reparse(typemap);
        } catch (e) {}
      });
    },
    setKeyMap(km) {
      this.$parent.setKeyMap(km);
    },
    toLocal() {
      localstorage.set(this.storeKey, this.editor.getValue());
      this.$parent.setTips("Done!");
    },
    delLocal() {
      const confirm = window.confirm("确定还原?");
      if (!confirm) return;
      localstorage.del(this.storeKey);
      this.$parent.parse();
      this.$parent.setTips("Done!");
    },
    toggleSetting() {
      this.$parent.toggleSetting("template");
    }
  },
  mounted() {
    this.init();
  }
};
</script>
