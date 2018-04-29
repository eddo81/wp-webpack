module.exports = ({ name, uri, description, version, author, author_uri, text_domain }) => {
  const template = `/*
  Theme Name:         ${name}
  Theme URI:          ${uri}
  Description:        ${description}
  Version:            ${version}
  Author:             ${author}
  Author URI:         ${author_uri}
  Text Domain:        ${text_domain}

  License:            MIT License
  License URI:        http://opensource.org/licenses/MIT
*/`;

  return template;
};
