@function done-ssr.renderer renderer
@parent done-ssr.module

A renderer function used to generate html from a route.

@signature `render(request)`

@param {Request} request The request from the server.

@return {Stream<String>} A Readable stream that omits HTML as it renders.
