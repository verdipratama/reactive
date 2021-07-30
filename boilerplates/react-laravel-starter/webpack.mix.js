const path = require('path');
const mix = require('laravel-mix');
const cssImport = require('postcss-import');
const cssNesting = require('postcss-nesting');
const purgecss = require('@fullhuman/postcss-purgecss');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .react()
  .js('resources/js/app.js', 'public/js')
  .sass('resources/sass/app.scss', 'public/css/app.css')
  .options({
    processCssUrls: false,
    postCss: [
      cssImport(),
      cssNesting(),
      require('tailwindcss'),
      ...(mix.inProduction()
        ? [
            purgecss({
              content: [
                './resources/views/**/*.blade.php',
                './resources/js/**/*.js',
              ],
              defaultExtractor: (content) =>
                content.match(/[\w-/:.]+(?<!:)/g) || [],
            }),
          ]
        : []),
    ],
  })
  .webpackConfig({
    output: { chunkFilename: 'js/[name].js?id=[chunkhash]' },
    resolve: {
      alias: {
        '@': path.resolve('resources/js'),
      },
    },
  })
  .version();
// .sourceMaps();
// .postCss('resources/css/app.css', 'public/css/app.css')
// Don't copy directory font and images place it on public folder
// .copyDirectory('resources/fonts', 'public/fonts')
// .copyDirectory('resources/images', 'public/images')

// if (mix.inProduction()) {
//   mix.version();
//   mix.webpackConfig({
//     output: {
//       chunkFilename: 'js/[name].js?id=[chunkhash]',
//       resolve: {
//         alias: {
//           '@': path.resolve('resources/js'),
//         },
//       },
//     },
//   });
// } else {
//   mix.webpackConfig({
//     output: {
//       chunkFilename: 'js/chunk/[name].js',
//     },
//   });
// }
