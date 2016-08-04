import concatRegexp from 'concat-regexp';

const QUOTED_WORD = /(['"][^'"\s]+['"])/;
const REQUIRE = concatRegexp(/require(?:\.resolve)?(?:\s|\()/, QUOTED_WORD, /\)?/g);
const IMPORT = concatRegexp(/import [\r\n\s\w{},*\$]*(?: from )?/, QUOTED_WORD, /(?:)/g);
const EXPORT = concatRegexp(/export [\r\n\s\w{},*\$]*(?: from )/, QUOTED_WORD, /(?:)/g);
const GEM = concatRegexp(/gem /, QUOTED_WORD, /(?:)/g);
const HOMEBREW = concatRegexp(/(?:depends_on|conflicts_with)(?: cask:| formula:)? /, QUOTED_WORD, /(?:)/g);
const TYPESCRIPT_REFERENCE = concatRegexp(/\/{3}\s?<reference path=/, QUOTED_WORD, /(?:)/g);
const DOCKER_FROM = /FROM\s([^\n]*)/g;
const VIM_PLUGIN = concatRegexp(/(?:(?:(?:Neo)?Bundle(?:Lazy|Fetch)?)|Plug(?:in)?)\s/, QUOTED_WORD, /(?:)/g);
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
