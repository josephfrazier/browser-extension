import { PYTHON_IMPORT } from '../../packages/helper-grammar-regex-collection/index.js';
import liveResolverQuery from '../resolver/live-resolver-query.js';
import relativeFile from '../resolver/relative-file.js';

export default {
  name: 'Python',

  resolve({ path, target }) {
    const isLocalFile = target.startsWith('.') && target.length > 1;
    const isInit = target === '.';
    const apiDoc = `https://docs.python.org/3/library/${target}.html`;

    if (isLocalFile) {
      return relativeFile({
        target: `${target.slice(1)}.py`,
        path,
      });
    }

    if (isInit) {
      return relativeFile({
        target: '__init__.py',
        path,
      });
    }

    return [
      apiDoc,
      liveResolverQuery({
        target: target.split('.')[0],
        type: 'pypi',
      }),
    ];
  },

  getPattern() {
    return {
      pathPatterns: ['.py$'],
      githubClasses: [
        'type-python',
        'highlight-source-python',
      ],
    };
  },

  getLinkRegexes() {
    return PYTHON_IMPORT;
  },
};
