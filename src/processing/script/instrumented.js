// -------------------------------------------------------------
// WARNING: this file is used by both the client and the server.
// Do not use any browser or node-specific API!
// -------------------------------------------------------------

// NOTE: constants are exported for the testing purposes
export const METHODS = [
    'querySelector',
    'querySelectorAll',
    'postMessage',
    'write',
    'writeln'
];

export const PROPERTIES = [
    'action',
    'activeElement',
    'attributes',
    'autocomplete',
    'background',
    'backgroundImage',
    'borderImage',
    'cookie',
    'cssText',
    'cursor',
    'data',
    'documentURI',
    'domain',
    'files',
    'firstChild',
    'firstElementChild',
    'host',
    'hostname',
    'href',
    'innerHTML',
    'innerText',
    'lastChild',
    'lastElementChild',
    'length',
    'listStyle',
    'listStyleImage',
    'localStorage',
    'location',
    'manifest',
    'onbeforeunload',
    'onerror',
    'onmessage',
    'origin',
    'pathname',
    'port',
    'protocol',
    'referrer',
    'sandbox',
    'search',
    'sessionStorage',
    'src',
    'target',
    'text',
    'textContent',
    'URL',
    'value',
    'which'
];

const INSTRUMENTED_METHOD_RE   = new RegExp(`^(${METHODS.join('|')})$`);
const INSTRUMENTED_PROPERTY_RE = new RegExp(`^(${PROPERTIES.join('|')})$`);

// NOTE: The obfuscated version of the mootools framework contains code
// that removes the RegExp.prototype.test method and restores it later.
//    delete z[A]; // z = RegExp.prototype, A = "test"
//    __set$(z, A, x.protect()); // x.protect - returns the removed method
// The __set$ function calls the test method of the regular expression. (GH-331)
var reTest = RegExp.prototype.test;
var test   = (regexp, str) => regexp.test ? regexp.test(str) : reTest.call(regexp, str);

// NOTE: we can't use the map approach here, because
// cases like `WRAPPABLE_METHOD['toString']` will fail.
// We could use the hasOwnProperty test, but it is
// significantly slower than the regular expression test
export function shouldInstrumentMethod (name) {
    return INSTRUMENTED_METHOD_RE.test(name);
}

export function shouldInstrumentProperty (name) {
    return test(INSTRUMENTED_PROPERTY_RE, name);
}