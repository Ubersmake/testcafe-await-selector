import { Selector } from 'testcafe';

fixture('Test await with Selector');

const queries = [
  'testcafe',
  'browser',
  'testing',
  'async',
  'await',
  'promise',
];

async function getResults() {
  const resultSelector = Selector('div.srg .g');
  const resultCount = await resultSelector.count;

  const results = {};

  for (let i = 0; i < resultCount; i += 1) {
    const currentSelector = resultSelector.nth(i);
    const linkSelector = currentSelector.find('.rc .r').child('a');
    const nameSelector = currentSelector.find('h3');
    const descriptionSelector = currentSelector.find('.st');

    const link = await linkSelector.getAttribute('href');
    const name = await nameSelector.textContent;
    const description = await descriptionSelector.textContent;

    results[link] = `${name} : ${description}`;
  }

  return results;
}

Promise.all(
  queries.map(async query => {
    test(`Selector child iteration for search results for: ${query}`, async t => {
      await t.navigateTo(`https://www.google.com/search?q=${query}`);

      const results = await getResults();
      // console.log(results);

      await t.expect(results).ok();

      return true;
    })
  })
);
