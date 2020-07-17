/*** Utility methods for use when generating build configuration objects. ***/

const camelCaseDash = string => string.replace( /-([a-z])/g, ( match, letter ) => letter.toUpperCase() );

const externals = [
  'components',
  'api-fetch',
  'edit-post',
  'element',
  'plugins',
  'editor',
  'block-editor',
  'blocks',
  'hooks',
  'utils',
  'date',
  'data',
  'i18n',
].reduce(
  ( externals, name ) => ( {
    ...externals,
    [ `@wordpress/${ name }` ]: `wp.${ camelCaseDash( name ) }`,
  } ),
  {
    react: 'React',
    jquery: 'jQuery',
    'react-dom': 'ReactDOM',
    lodash: 'lodash',
  }
);

module.exports = externals;
