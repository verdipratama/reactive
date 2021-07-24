#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sao = require('sao');
const cac = require('cac');
const chalk = require('chalk');

const { version } = require('../package.json');
const generator = path.resolve(__dirname, './');

const cli = cac('verdipratama-react-boilerplate');

const showEnvInfo = async () => {
  console.log(chalk.bold('\nEnviroment Info:'));

  const result = await envInfo.run({
    System: ['OS', 'CPU'],
    Binaries: ['Node', 'Yarn', 'npm'],
    Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
    npmGlobalPackages: ['react', 'create-react-app'],
  });

  console.log(result);
  process.exit(1);
};

cli
  .command('[out-dir]', 'Generate in a custom directory or current directory')
  .option('--verbose', 'Show debug logs')
  .action((outDir = '.', cliOptions) => {
    if (cliOptions.info) return showEnvInfo();

    fs.access(outDir, function (err) {
      if (!err) {
        console.log(chalk`{red Directory exists. Try to use another name.}`);
        process.exit(1);
      }
    });

    if (outDir === '.') {
      console.log(
        chalk`{red Please specify file directory 'npx @verdipratama/reactive [folder-name]'}`
      );
      process.exit(1);
    }

    console.log();
    console.log(chalk`{cyan @verdipratama/reactive v${version}}`);
    console.log(chalk`✨ Generating React.js project in {cyan ${outDir}}`);

    const { verbose, answers } = cliOptions;
    const logLevel = verbose ? 4 : 2;

    // See https://saojs.org/api.html#standalone-cli
    sao({ generator, outDir, logLevel, answers, cliOptions })
      .run()
      .catch((err) => {
        console.trace(err);
        process.exit(1);
      });
  });

cli.help();

cli.version(version);

cli.parse();
