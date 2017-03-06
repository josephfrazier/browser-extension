import $ from 'jquery';
import doRequest from 'live-resolver/src/utils/do-request';
import * as config from 'live-resolver/config';

const loader = (urls, cb) => {
  if (urls.length === 0) return cb(new Error('Could not load any url'));
  const { url, method = 'HEAD' } = urls.shift();

  // match server paths that start with /q/, but not /q/go/
  if (/^https:\/\/githublinker.herokuapp.com\/q\/(?!go\/)/.test(url)) {
    const [type, packageName] = url.split('/').slice(-2);
    const { registry } = config[type];

    return chrome.runtime.sendMessage({
      type: 'permissionsRequest',
      payload: {
        url: registry,
      },
    }, (granted) => {
      if (!granted) {
        return loader(urls, cb);
      }

      return doRequest(packageName, type, (err, packageUrl) => {
        if (err) {
          return cb(err);
        }

        cb(null, url, { url: packageUrl });
      });
    });
  }

  $.ajax({
    method,
    url,
  }).then((res) => {
    chrome.runtime.sendMessage({
      type: 'track',
      payload: {
        category: 'fetch',
        action: 'success',
      },
    });

    cb(null, url, res);
  }).fail(() => {
    if (urls.length === 0) {
      chrome.runtime.sendMessage({
        type: 'track',
        payload: {
          category: 'fetch',
          action: 'error',
        },
      });

      return cb(new Error('Could not load any url'));
    }

    loader(urls, cb);
  });
};

export default () => {
  chrome.runtime.onMessage.addListener(({ type, payload }, sender) => {
    if (type !== 'fetch') return;

    loader(payload, (err, url, res) => {
      chrome.tabs.sendMessage(sender.tab.id, {
        err,
        url,
        res,
      });
    });
  });
};
