module.exports = ({ name, description, background_color, theme_color }) => {
  const template = `{
  "name": "${name}",
  "short_name": "${name}",
  "description": "${description}",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "${background_color}",
  "theme_color": "${theme_color}"
}`;

  return template;
};
