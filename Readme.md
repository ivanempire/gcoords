# GCoords

A tiny NPM module for looking up coordinates from an address. Relies on the Google Maps web API. You will need to get a key [here](https://developers.google.com/maps/web/). The only dependency is the native https module for making the request.

## Usage

Import it into your project:

```javascript
const newGeo = require("ivan-geo");
```

Initialize with an API key and data format.

```javascript
newGeo.init(<YOUR_API_KEY>,"json");
```

Query for coordinates:

```javascript
newGeo.getCoords("Rome, Italy",function(resp) {
	console.log(resp);
});
```

### Roadmap
 - [x] JSON support
 - [ ] XML support
 - [ ] Error handling/address cleanup/validation
 - [ ] Multiple results
 - [ ] Clean up the code
 - [ ] Push to NPM