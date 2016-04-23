import { TYPESCRIPT_REFERENCE } from '../../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../../insert-link';

export default class LiveResolver {

  getPattern() {
    return ['.ts'];
  }

  parseBlob(blob) {
    insertLink(blob.el, TYPESCRIPT_REFERENCE, {
      resolver: 'relativeFile',
      target: '$1',
      path: blob.path,
    });
  }
}
