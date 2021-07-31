const path = require('path');

const purgecss = {
  '@fullhuman/postcss-purgecss': {
    content: ['./src/**/*.js'],
    defaultExtractor(content) {
      const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '');
      return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [];
    },
    safelist: [
      /-(leave|enter|appear)(|-(to|from|active))$/,
      /^(?!(|.*?:)cursor-move).+-move$/,
      /^router-link(|-exact)-active$/,
      'html',
      'body',
    ],
  },
};

module.exports = {
  plugins: {
    'postcss-import': {
      resolve(id, basedir) {
        // similar to how css-loader's handling of node_modules
        if (id.startsWith('~')) {
          return path.resolve('./node_modules', id.slice(1));
        }
        // resolve relative path, @import './components/style.css'
        return path.resolve(basedir, id);
      },
    },
    'postcss-mixins': {},
    'postcss-simple-vars': {},
    'postcss-color-function': {},
    'postcss-nested': {},
    'postcss-extend-rule': {},
    'postcss-discard-empty': {},
    'postcss-discard-unused': {},
    'postcss-rem': {
      baseline: 16, // Default to 16
      // convert: 'px', // Default to rem
      fallback: false, // Default to false
      precision: 6, // Default to 5
    },
    'postcss-sort-media-queries': {
      sort: 'mobile-first',
    },
    autoprefixer: {
      overrideBrowserslist: '> 1%, IE 6, Explorer >= 10, Safari >= 7',
    },
    ...(process.env.NODE_ENV === 'production' ? purgecss : {}),
    // Specifically used here to utilize purgecss comments
    'postcss-discard-comments': {},
    cssnano: {
      zindex: false,
    },
  },
};