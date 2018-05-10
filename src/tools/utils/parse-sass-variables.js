const fs = require('fs');
const stripComments = require('strip-json-comments');
const sass = require('node-sass');

function getVariables(content) {
  const variableRegex = /\$(.+):\s+(.+);?/;
  const variables = [];

  stripComments(content)
    .split('\n')
    .forEach(line => {
      const variable = variableRegex.exec(line);
      if (!variable) return;

      const name = variable[1].trim();
      const value = variable[2].replace(/!default|!important/g, '').trim();

      variables.push({ name, value });
      return;
    });

  return variables;
}

function constructSassString(variables) {
  const asVariables = variables
    .map(variable => `$${variable.name}: ${variable.value};`)
    .join('\n');
  const asClasses = variables
    .map(variable => `.${variable.name} { value: ${variable.value} }`)
    .join('\n');

  return `${asVariables}\n${asClasses}`;
}

function parseVariables(variables) {
  const result = sass
    .renderSync({
      data: constructSassString(variables),
      outputStyle: 'compact'
    })
    .css.toString();

  const parsedVariables = result
    .split(/\n/)
    .filter(line => line && line.length)
    .map(variable => {
      const [, name, value] = /\.(.+) { value: (.+); }/.exec(variable);
      const obj = {};

      obj[name] = value;
      return obj;
    });

  if (!parsedVariables.length) {
    return {};
  }
  return Object.assign.apply(this, parsedVariables);
}

module.exports = function readSassVariables(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return parseVariables(getVariables(content));
};
