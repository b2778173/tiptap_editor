import { Mark } from 'tiptap';
import { markInputRule, updateMark, removeMark } from 'tiptap-commands';

/**
 * FontSize - Extends the built in Mark from tiptap allowing
 * the editor to <drumroll> set the font-size.
 */
export default class fontColor extends Mark {
    get name() {
        return 'fontColor';
    }

    get schema() {
        return {
            attrs: { color: { default: 'black' } },
            parseDOM: [{
                style: 'color',
                getAttrs: value => value,
            }],
            toDOM: mark => ['span', { style: `color: ${mark.attrs.color}` }, 0],
        };
    }

    commands({ type }) {
        return attrs => {
            if ((attrs.color) && (attrs.color != 'black')) {
                return updateMark(type, attrs);
            }
            return removeMark(type);
        };
    }

    inputRules({ type }) {
        return [markInputRule(/(?:\*\*|__)([^*_]+)(?:\*\*|__)$/, type)];
    }
}