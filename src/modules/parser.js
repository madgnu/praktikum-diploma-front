const dummy = `__DUMMY__${Date.now()}__`;
const meta = `__META__${Date.now()}__`;

const vDomTemplates = { };

function djb2(str) {
  let hash = 5381;
  let i = str.length;

  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  return hash >>> 0;
}

function tokenize(strToParse) {
  const chars = strToParse.split('');
  const chunks = [];
  let lastChar = ' ';
  let oldIsWhitespace = true;
  while (chars.length) {
    const char = chars.shift();
    const isWhitespace = char.match(/\s/);
    if (char === '<') chunks.push('');
    if (char !== '<' && lastChar === '>') chunks.push('');
    if (char !== '<' && lastChar !== '>' && (chunks[chunks.length - 1] === dummy)) chunks.push('');
    if (isWhitespace && chunks[chunks.length - 1] && !oldIsWhitespace) {
      chunks[chunks.length - 1] += ' ';
    } else if (!isWhitespace) chunks[chunks.length - 1] += char;

    if (!isWhitespace || !oldIsWhitespace) {
      lastChar = char;
      oldIsWhitespace = lastChar.match(/\s/);
    }
  }

  return chunks.filter((e) => e.length).map((e) => e.trim());
}

function parseTag(tagStr) {
  let cleanedStr = tagStr.slice(1, -1);
  let closing = false;
  let selfClosing = false;
  if (cleanedStr[0] === '/') {
    closing = true;
    cleanedStr = cleanedStr.slice(1);
  }
  if (cleanedStr[cleanedStr.length - 1] === '/') {
    selfClosing = true;
    cleanedStr = cleanedStr.slice(0, -1);
  }
  cleanedStr = cleanedStr.trim();

  // костыльный завод
  const tagTokens = cleanedStr.split(' ');
  const tagChunks = [];
  let inEscape = false;
  for (let i = 0; i < tagTokens.length; i += 1) {
    const currentToken = tagTokens[i];
    const escapeChange = currentToken.match(/"/g) && currentToken.match(/"/g).length % 2 !== 0;
    if (!inEscape) {
      tagChunks.push(currentToken);
    } else {
      tagChunks[tagChunks.length - 1] += ` ${currentToken}`;
    }
    inEscape = escapeChange ? !inEscape : inEscape;
  }

  let type = tagChunks.shift();
  const props = {};

  for (let i = 0; i < tagChunks.length; i++) {
    const el = tagChunks[i];
    let [k, v] = ['', ''];
    if (el.indexOf('=') > -1) {
      [k, v] = el.split('=');
      if (v[0] === '"') v = v.slice(1, -1);
    } else if (el === dummy) {
      props[`${meta}__${i}`] = true;
      continue;
    } else {
      k = el;
      v = true;
    }
    props[k] = v;
  }

  return {
    type,
    props,
    children: [],
    closing,
    selfClosing,
  };
}

function buildVDOM(chunks) {
  const root = {
    children: [],
  };
  root.parent = root;
  let parent = root;
  while (chunks.length) {
    const chunk = chunks.shift();
    if (chunk[0] !== '<') {
      parent.children.push(chunk);
    } else {
      const tag = parseTag(chunk);
      tag.parent = parent;
      if (!tag.closing) {
        if (tag.type) {
          parent.children.push(tag);
        } else {
          parent.parent.children.push(tag);
        }
      };
      if (!tag.closing && !tag.selfClosing) {
        parent = tag;
      } else if (tag.closing) {
        const t = parent;
        parent = parent.parent;
        delete t.parent;
      } else if (tag.selfClosing) {
        delete tag.parent;
      }
      delete tag.closing;
      delete tag.selfClosing;
    }
  }
  return root.children[0];
}

function appendValues(vDomTemplate, values) {
  if (vDomTemplate === dummy) return values.shift();

  if (typeof vDomTemplate !== 'object') return vDomTemplate;

  const ret = {
    type: null,
    props: {},
    children: [],
  };

  ret.type = (vDomTemplate.type === dummy) ? values.shift() : vDomTemplate.type;

  for (let [k ,v] of Object.entries(vDomTemplate.props)) {
    if (k.substring(0, meta.length) === meta) {
      ret.props = Object.assign(ret.props, values.shift());
    } else {
      if (k === dummy) k = values.shift();
      if (v === dummy) v = values.shift();
      ret.props[k] = v;
    }
  }

   vDomTemplate.children.forEach((el) => {
    if (el === dummy) {
      const v = values.shift();
      if (typeof v === 'object' && v && v.type === '') {
        ret.children.push(...v.children);
      } else if (Array.isArray(v)) {
        ret.children.push(...v);
      } else if (v) {
        ret.children.push(v);
      };
    } else {
      const child = appendValues(el, values);
      if (child) ret.children.push(child);
    }
  });

  return ret;
}

function parser(unparsedString, ...values) {
  const joinedString = unparsedString.join(dummy);
  const hash = djb2(joinedString);

  if (!vDomTemplates.hasOwnProperty(hash)) {
    const tokens = tokenize(joinedString);
    vDomTemplates[hash] = buildVDOM(tokens);
  }

  return appendValues(vDomTemplates[hash], values);
}

export default parser;
