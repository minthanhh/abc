const { parseArgs } = require('node:util');

const options = {
  app: {
    type: 'string',
    short: 'a',
  },
  token: {
    type: 'string',
    short: 't',
  },
  id: {
    type: 'string',
    short: 'i',
  },
};

const { values } = parseArgs({ options });

fetch(`https://api.heroku.com/apps/${values.app}/formation`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/vnd.heroku+json; version=3.docker-releases',
    Authorization: `Bearer ${values.token}`,
  },
  body: JSON.stringify({
    updates: [
      {
        type: 'web',
        docker_image: values.id,
      },
    ],
  }),
  redirect: 'follow',
})
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    process.exit(0);
  })
  .catch((error) => {
    console.log('error', error);
    process.exit(1);
  });
