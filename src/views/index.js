const createList = (lists) => `should give lists html`;

const homePage = (data) => `
  <div>${createLists(data)}</div>
`

module.exports = { homePage };
