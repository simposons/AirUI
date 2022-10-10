<template>
  <div style="border: 1px solid #ccc;">
    <toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :default-config="toolbarConfig"
        :mode="mode"
    />
    <editor
        style="height: 500px; overflow-y: hidden;"
        v-model="html"
        :default-config="editorConfig"
        :mode="mode"
        @onCreated="onCreated"
    />
</div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
  name: 'wangeditor-example',
  components:{
    Editor, 
    Toolbar
  },
  props: {
  },
  data() {
    return {
      editor: null,
            html: '<p>hello</p>',
            toolbarConfig: { },
            editorConfig: { placeholder: '请输入内容...' },
            mode: 'default', // or 'simple'
    }
  },

  mounted() {
        // 模拟 ajax 请求，异步渲染编辑器
        setTimeout(() => {
            this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
        }, 1500)
    },
    beforeDestroy() {
        const {editor} = this
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    },
  methods: {
    onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
  }
};
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss">

</style>
