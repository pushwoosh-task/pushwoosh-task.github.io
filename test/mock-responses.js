import glob from 'glob';
import nock from 'nock';

export default () => new Promise((resolve, reject) => 
  glob('./test/mocks/**/*', (err, files) => {
    if(err) return reject(err);

    files
    .filter(file => file.match(/\.json$/))
    .forEach(file => {
      const url = `/v0/${file.replace('./test/mocks/', '')}`;
      nock('https://hacker-news.firebaseio.com')
      .get(url)
      .reply(200, require(file.replace('/test', '')));
    });
    resolve();
  })
);
