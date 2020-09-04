import { Node } from 'tiptap'

export default class Iframe extends Node {

    get name() {
        return 'iframe'
    }

    get schema() {
        return {
            inline: true,
            attrs: {
                src: {
                    default: null,
                },
            },
            group: 'inline',
            selectable: false,
            parseDOM: [{
                tag: 'iframe',
                getAttrs: dom => ({
                    src: dom.getAttribute('src'),
                }),
            }],
            toDOM: node => ['iframe', {
                src: node.attrs.src,
                frameborder: 0,
                allowfullscreen: 'true',
            }],
        }
    }

    get view() {
        return {
            props: ['node', 'updateAttrs', 'view'],
            computed: {
                src: {
                    get() {
                        return this.node.attrs.src
                    },
                    set(src) {
                        this.updateAttrs({
                            src,
                        })
                    },
                },
            },
            template: `
        <div class="iframe">
          <iframe class="iframe__embed" :src="src"></iframe>
        </div>
      `,
        }
    }

}