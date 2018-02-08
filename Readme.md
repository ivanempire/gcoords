# GCoords

A tiny NPM module for looking up coordinates from an address. Relies on the Google Maps web API. You will need to get a key [here](https://developers.google.com/maps/documentation/geocoding/intro). The only dependency is the native https module for making the request.

## Usage

Import it into your project:

```javascript
const gcoords = require("gcoords");
```

Initialize with an API key:

```javascript
gcoords.init(<YOUR_API_KEY>);
```

Lookup location's coordinates:

```javascript
gcoords.getCoords("Rome, Italy").then((result) => {
	console.log(result);
});
```

Lookup coordinates' address:

````javascript
gcoords.getLocation(["40.714224","-73.961452"]).then((result) => {
	console.log(result);
});
````

Both functions support a second parameter - the data format. If left blank, the default is json. Some examples:

````javascript
gcoords.getLocation(["40.714224","-73.961452"],"json").then((result) => {
	//Will return JSON
});

gcoords.getLocation(["40.714224","-73.961452"]).then((result) => {
	//Will also return JSON
});

gcoords.getLocation(["40.714224","-73.961452"],"xml").then((result) => {
	//XML because why not...
});
````


### Roadmap
 - [x] JSON support
 - [x] XML support
 - [x] Coordinates to location
 - [ ] Error handling/address cleanup/validation
 - [ ] Multiple results
 - [x] Clean up the code
 - [x] Promises
 - [x] Push to NPM