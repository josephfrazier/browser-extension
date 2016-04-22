import liveResolverQuery from './live-resolver-query.js';
import { join, extname } from 'path';
import relativeFile from './relative-file.js';
import liveResolverPing from './live-resolver-ping.js';
import stdLib from '../../packages/ruby-stdlib';

function rubyFile(target, path) {
  let newTarget = target;

  if (!extname(target)) {
    newTarget += '.rb';
  }

  const isPath = !!target.match(/^\.\.?[\\|/]?/);
  if (isPath) {
    return relativeFile({ target: newTarget, path });
  }

  const basePath = join(path.split('/lib/')[0], 'lib');
  return 'https://github.com' + join(basePath, newTarget);
}

function stdLibResolver(target) {
  const rubyDocs = 'http://ruby-doc.org/stdlib/libdoc/';

  return liveResolverPing({
    target: `${rubyDocs}${target}/rdoc/index.html`,
  });
}

function liveResolver(target) {
  return liveResolverQuery({
    type: 'rubygems',
    target: target.split('/')[0],
  });
}

export default function ({ path, target }) {
  if (stdLib.includes(target)) {
    return stdLibResolver(target);
  }

  return [
    rubyFile(target, path),
    liveResolver(target),
  ];
}
