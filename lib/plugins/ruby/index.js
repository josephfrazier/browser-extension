import { REQUIRE } from '../../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../../insert-link';
import preset from '../../pattern-preset';

export default class LiveResolver {

  getPattern() {
    return preset('Ruby');
  }

  parseBlob(blob) {
    [REQUIRE].forEach((regex) => {
      insertLink(blob.el, regex, {
        resolver: 'rubyUniversal',
        target: '$1',
        path: blob.path,
      });
    });
  }
}
