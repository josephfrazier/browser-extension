import concatRegexp from 'concat-regexp';

function concatRegexpGlobal() {
  return concatRegexp.apply(null, Array.from(arguments).concat(/(?:)/g));
}

const CAPTURE_QUOTED_WORD = /(['"][^'"\s]+['"])/;
const JS_IMPORTS = /[\r\n\s\w{},*\$]*/;

const REQUIRE = concatRegexpGlobal(/require(?:\.resolve)?(?:\s|\()/, CAPTURE_QUOTED_WORD);
const IMPORT = concatRegexpGlobal(/import /, JS_IMPORTS, /(?: from )?/, CAPTURE_QUOTED_WORD);
const EXPORT = concatRegexpGlobal(/export /, JS_IMPORTS, /(?: from )/, CAPTURE_QUOTED_WORD);
const GEM = concatRegexpGlobal(/gem /, CAPTURE_QUOTED_WORD);
const HOMEBREW = concatRegexpGlobal(/(?:depends_on|conflicts_with)(?: cask:| formula:)? /, CAPTURE_QUOTED_WORD);
const TYPESCRIPT_REFERENCE = concatRegexpGlobal(/\/{3}\s?<reference path=/, CAPTURE_QUOTED_WORD);
const DOCKER_FROM = /FROM\s([^\n]*)/g;
const VIM_PLUGIN = concatRegexpGlobal(/(?:(?:(?:Neo)?Bundle(?:Lazy|Fetch)?)|Plug(?:in)?)\s/, CAPTURE_QUOTED_WORD);
const RUST_CRATE = /(?:extern crate|use) ([^:; ]+)/g;
const PYTHON_IMPORT = /(?:(?:\n|^)\s*import|from)\s([^\s]*)/g;

export {
  REQUIRE,
  IMPORT,
  EXPORT,
  GEM,
  HOMEBREW,
  TYPESCRIPT_REFERENCE,
  DOCKER_FROM,
  VIM_PLUGIN,
  RUST_CRATE,
  PYTHON_IMPORT,
};
