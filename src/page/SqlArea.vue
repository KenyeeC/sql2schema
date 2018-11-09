<template>
  <div class="area">
    <p>sql</p>
    <div :class="{err: isError}">
      <textarea id="sql" :placeholder="this.placeholder" />
    </div>
  </div>
</template>

<script>
import CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/mode/sql/sql'
export default {
  props: {
    isError: Boolean
  },
  data(){
    return {
      editor: null,
      placeholder: '输入sql',
    }
  },
  mounted(){
    this.editor = CodeMirror.fromTextArea(document.getElementById('sql'), {
      mode:'sql',
      theme:'monokai',
      extraKeys: {"Ctrl": "autocomplete"},
    });
    this.editor.on("change",editor => {
      this.$parent.parse(editor.getValue())
    });
  }
}
</script>