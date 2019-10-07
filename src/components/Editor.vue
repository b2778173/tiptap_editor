<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <!-- <icon name="bold" /> -->
          <img class="icon" src="../assets/images/icons/bold.svg" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <!-- <icon name="bold" /> -->
          <img class="icon" src="../assets/images/icons/font-solid.svg" />
          <!-- <select>
              <option>red</option>
              <option>blue</option>
              <option>yellow</option>
          </select>-->
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >H1</button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >H2</button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >H3</button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <!-- <icon name="ul" /> -->
          <img class="icon" src="../assets/images/icons/ul.svg" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <!-- <icon name="ol" /> -->
          <img class="icon" src="../assets/images/icons/ol.svg" />
        </button>

        <button class="menubar__button" @click="showImagePrompt(commands.image)">
          <img class="icon" src="../assets/images/icons/image.svg" />
        </button>

        <button class="menubar__button" @click="showVideoPrompt(commands.iframe)">
          <img class="icon" src="../assets/images/icons/youtube-brands.svg" />
        </button>
      </div>
    </editor-menu-bar>

    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
// import Icon from "./Icon";
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import Iframe from "./extension/Iframe";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Link,
  History,
  Image,
  Strike
} from "tiptap-extensions";
export default {
  components: {
    EditorContent,
    EditorMenuBar
    // Icon
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new History(),
          new Strike(),
          new Image(),
          new Iframe()
        ],
        content: ``,
        onUpdate: ({ getJSON }) => {
          this.value = getJSON();
        }
      }),
      //   contentObject: {
      //     type: "doc",
      //     content: []
      //   },
      value: "default content"
    };
  },
  mounted() {
    this.editor.setContent(this.value);
  },
  watch: {
    value: {
      handler: function(NewVal) {
        console.log("watch");
        this.editor.setContent(NewVal);
      },
      deep: true
    }
  },
  methods: {
    showImagePrompt(command) {
      const src = prompt("請輸入圖片網址");
      if (src !== null) {
        command({ src });
      }
    },
    showVideoPrompt(command) {
      //   console.log("add video");
      const src = prompt("請輸入影片網址");
      if (src !== null) {
        command({ src });
      }
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>
<style scoped>
.icon {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 0.8rem;
  height: 0.8rem;
  margin: 0 0.3rem;
  top: -0.05rem;
  fill: currentColor;
}
.menubar__button {
  display: inline-block;
}
.editor__content {
  border: 1px dotted #8ba49a;
  height: 400px;
  overflow-y: scroll;
}
</style>
<style>
.ProseMirror {
  text-align: left;
  margin: 5px;
}
.iframe__embed {
  border: 0;
}
p {
  margin: 0 !important;
}
</style>