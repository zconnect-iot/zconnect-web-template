const path = require('path')

module.exports = {
  styleguideComponents: {
    Wrapper: path.join(__dirname, './Wrapper'),
  },
  skipComponentsWithoutExample: true,
  ignore: ['**/selectors.js', '**/endpoints.js', '**/*.test.js', '**/utils.js'],
  sections: [
    {
      name: 'Components',
      description: 'Dumb/Presentational components that only depend on props and/or internal state',
      sections: [
        {
          name: 'Structural',
          description: 'Page structure / presentational components',
          components: [
            '../src/modules/zconnect-web/components/Page/index.js',
            '../src/modules/zconnect-web/components/Content/index.js',
            '../src/modules/zconnect-web/components/Modal/index.js',
            '../src/modules/zconnect-web/components/Panel/index.js',
            '../src/modules/zconnect-web/components/Card/index.js',
          ],
        },
        {
          name: 'Widgets',
          description: 'Page structure / presentational components',
          components: '../src/modules/zconnect-web/components/**/*.js',
          ignore: [
            '**/List/GriddlePlugin.js',
            '**/components/Content/**',
            '**/components/Modal/**',
            '**/components/Panel/**',
            '**/components/Card/**',
            '**/components/Page/**',
          ],
        },
      ],
    },
    {
      name: 'Containers',
      description: 'Store connected components that interact with the store and/or zconnect api via zconnect-js',
      components: '../src/modules/zconnect-web/containers/**/*.js',
      ignore: [
        '**/containers/ActivityStream/components/**',
        '**/components/Content/**',
        '**/containers/AsyncList/AsyncList.js',
        '**/containers/NotificationSettings/NotificationSettings.js',
      ],
    },
  ],
}
