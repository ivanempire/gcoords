# GCoords

A tiny NPM module for looking up coordinates from an address. Relies on the Google Maps web API. You will need to get a key [here](https://developers.google.com/maps/web/). The only dependency is the native https module for making the request.

## Usage

Import it into your project:

```javascript
const gcoords = require("gcoords");
```

Initialize with an API key and data format.

```javascript
gcoords.init(<YOUR_API_KEY>,"json");
```

Lookup location's coordinates:

```javascript
gcoords.getCoords("Rome, Italy",function(resp) {
	console.log(resp);
});
```

Lookup coordinates' address:

````javascript
gcoords.getLocation(["40.714224","-73.961452"],function(resp) {
	console.log(resp);
});
````

### Roadmap
 - [x] JSON support
 - [ ] XML support
 - [x] Coordinates to location
 - [ ] Error handling/address cleanup/validation
 - [ ] Multiple results
 - [ ] Clean up the code
 - [ ] Promises
 - [ ] Push to NPM