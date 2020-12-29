module.exports = (config) => {
  config.addPassthroughCopy('src/css');
  config.addPassthroughCopy('src/images');
  config.addPassthroughCopy('src/js');
  config.addPassthroughCopy('src/favicon.ico');

  return {
    dir: {
      input: 'src',
    },
  };
};
