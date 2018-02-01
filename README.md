# Overlock Front-end

Based on [zconnect-web-template](https://code.zoetrope.io/zconnect/zconnect-web-template)

## Develop

`git clone git@code.zoetrope.io:overlock/overlock-front.git`

`cd overlock-front`

`git submodule update --init`

`npm i`

`npm start`

Dev server running on `http://localhost:3000`

## Test

`npm run test`

## Build

`npm run build`

## Preview build

Serve up the production build on `http://localhost:3000`:

`npm run start:build`

## Notes on styling

The project has `zconnect-web` as a dependency. `zconnect-web` provides a bunch of reusable components that (in theory) are fully customisable via a number of different approaches..

1. Changing the global SCSS variables defined [here](./src/style/theme/variables.scss) if one is defined for the attribute you want to change e.g. `$page-bg` for Page background

2. Using the BEM classnames to write CSS rules that over ride the default rules. Webpack is configured not to hash any of the `zconnect-web` components class names so adding a rule such as `.Page__header { background: blue }` will work if it is included after the original css rule.

3. Passing a className to any* of the components and providing your own rules e.g. `<Page className={styles.Page}` will add a hashed className to the element so you do `import styles from './style.scss'` and provide any modifications there.

4. The colours defined in `variables.scss` are also wrapped into global rules for setting the background and text colour of any element by adding the appropriate class name e.g. `.bg-primary` and `.text-success` gives `background: $brand-primary` and `color: $brand-success` respectively.

\* Not all components were implemented with this but they should be so feel free to add it if missing, it's really easy thanks to BEMHelper (`...classes(null, null, props.className)`)
