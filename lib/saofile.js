const fs = require('fs');
const clone = require('git-clone');
const rimraf = require('rimraf');

module.exports = {
  prompts: [
    {
      name: 'version',
      message: 'Please select boilerplate : ',
      type: 'list',
      choices: [
        { name: 'React SSR with Webpack', value: 'react-webpack-starter' },
        { name: 'Frontity React Wordpress', value: 'react-wordpress-starter' },
      ],
      default: 'react-webpack-starter',
    },
  ],
  async completed() {
    const folderPath = this.outDir;

    await clone(
      'https://github.com/verdipratama/reactive',
      folderPath,
      [],
      async () => {
        const allFiles = fs
          .readdirSync(`${folderPath}/boilerplates/${this.answers.version}`)
          .map((fileName) => {
            return fileName;
          });

        for (let i = allFiles.length - 1; i >= 0; i--) {
          var file = allFiles[i];
          fs.rename(
            `${folderPath}/boilerplates/${this.answers.version}/${file}`,
            `${folderPath}/${file}`,
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }

        rimraf(`${folderPath}/.git`, (e) => e && console.log(e));
        rimraf(`${folderPath}/.github`, (e) => e && console.log(e));
        rimraf(`${folderPath}/lib`, (e) => e && console.log(e));
        rimraf(`${folderPath}/boilerplates`, (e) => e && console.log(e));
      }
    );
  },
};
