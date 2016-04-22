import assert from 'assert';
import rubyUniversal from '../../lib/resolver/ruby-universal';

describe('ruby-universal', () => {
  const baseUrl = 'https://githublinker.herokuapp.com';

  // it('returns live resolver query url', () => {
  //   const result = rubyUniversal({ target: 'json', path: '/john/wayne/blob/master/lib/wayne.rb' });
  //   const expected = `${baseUrl}/q/rubygems/json`;
  //
  //   assert.deepEqual(result, expected);
  // });

  it('with file ext', () => {
    const result = rubyUniversal({ target: 'wayne/json.rb', path: '/john/wayne/blob/master/lib/wayne.rb' });
    const expected = 'https://github.com/john/wayne/blob/master/lib/wayne/json.rb';

    assert.deepEqual(result[0], expected);
  });

  it('without file ext', () => {
    const result = rubyUniversal({ target: 'wayne/json', path: '/john/wayne/blob/master/lib/wayne.rb' });
    const expected = [
      'https://github.com/john/wayne/blob/master/lib/wayne/json.rb',
      `${baseUrl}/q/rubygems/wayne`,
    ];

    assert.deepEqual(result, expected);
  });

  it('relative file', () => {
    const result = rubyUniversal({ target: './wayne/json', path: '/john/wayne/blob/master/lib/wayne.rb' });
    const expected = 'https://github.com/john/wayne/blob/master/lib/wayne/json.rb';

    assert.deepEqual(result[0], expected);
  });

  it('relative file without ext', () => {
    const result = rubyUniversal({ target: './wayne/json.rb', path: '/john/wayne/blob/master/lib/wayne.rb' });
    const expected = 'https://github.com/john/wayne/blob/master/lib/wayne/json.rb';

    assert.deepEqual(result[0], expected);
  });

  it('stdlib', () => {
    assert.deepEqual(
      rubyUniversal({ target: 'tracer', path: '/john/wayne/blob/master/lib/wayne.rb' }),
      `${baseUrl}/ping?url=http://ruby-doc.org/stdlib/libdoc/tracer/rdoc/index.html`);
  });
});
