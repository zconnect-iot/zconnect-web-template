const path = require('path')

module.exports = {
  styleguideComponents: {
    Wrapper: path.join(__dirname, './Wrapper'),
  },
  skipComponentsWithoutExample: true,
  ignore: [
    '../src/modules/zconnect-web/components/GoogleMap/Marker.js',
  ],
  sections: [
    {
      name: 'Components',
      description: 'Dumb/presentational components that only depend on props and/or internal state',
      components: '../src/modules/zconnect-web/components/**/*.js',
    },
    {
      name: 'Containers',
      description: 'Store connected components that interact with the store and/or zconnect api via zconnect-js',
      components: '../src/modules/zconnect-web/containers/**/*.js',
    },
  ],
}
