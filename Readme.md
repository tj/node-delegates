
# delegates

  Node method and accessor delegation utilty.

## Installation

Using

In the browser (using component): 

```
$ component install matthewmueller/delegates
```

In node:

```
$ npm install matthewmueller-delegates
```

## Example

```js
var delegate = require('delegates');

...

delegate(proto, 'request')
  .method('acceptsLanguages')
  .method('acceptsEncodings')
  .method('acceptsCharsets')
  .method('accepts')
  .method('is')
  .access('querystring')
  .access('idempotent')
  .access('socket')
  .access('length')
  .access('query')
  .access('search')
  .access('status')
  .access('method')
  .access('path')
  .access('body')
  .access('host')
  .access('url')
  .getter('subdomains')
  .getter('protocol')
  .getter('header')
  .getter('stale')
  .getter('fresh')
  .getter('secure')
  .getter('ips')
  .getter('ip')
```

# Test

Using node:

In the browser;

```
npm install
make test-browser
```

In node:

```
npm install
make test
```

# License

  MIT
