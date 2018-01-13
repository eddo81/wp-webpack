const semver = require('semver');
const _CONFIG = require('../config');
const utils = require('./utils.js');
const shell = require('shelljs')

function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim();
}

let versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: _CONFIG.package.engines.node
  },
];

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: _CONFIG.package.engines.npm
  });
}

module.exports = function () {
  let warnings = [];

  for (let i = 0; i < versionRequirements.length; i++) {
    let mod = versionRequirements[i];

    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        mod.currentVersion + ' should be ' +
        mod.versionRequirement
      )
    }
  }

  if (warnings.length) {
    console.log('');
    console.log('To use this template, you must update following to modules:');
    console.log();

    for (let i = 0; i < warnings.length; i++) {
      let warning = warnings[i];
      console.log('  ' + warning);
    }

    console.log();
    process.exit(1);
  }
}
