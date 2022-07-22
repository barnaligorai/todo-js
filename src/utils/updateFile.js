const updateFile = (filepath, content, fs) => {
  fs.writeFileSync(filepath, JSON.stringify(content), 'utf8');
};

module.exports = { updateFile };
