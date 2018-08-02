/*!
 * Bedrock DID Client Module.
 *
 * Copyright (c) 2017-2018 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const bedrock = require('bedrock');
const {config} = bedrock;
const didio = require('did-io');
const jsonld = bedrock.jsonld;
const jsigs = require('jsonld-signatures')();

require('./config');

const api = {};
module.exports = api;

api.jsonld = jsonld;

bedrock.events.on('bedrock.init', () => {
  const cfg = config['did-client'];

  // get configured lib instances
  jsigs.use('jsonld', jsonld);
  didio.use('jsonld', api.jsonld);
  didio.use('jsonld-signatures', jsigs);

  // ensure jsonld can look up DIDs
  const docLoader = bedrock.jsonld.documentLoader;
  const v1 = didio.methods.veres();
  jsonld.documentLoader = async url => {
    if(url.startsWith('did:v1:')) {
      const {mode, hostname} = cfg.methods.v1;
      const {doc} = await v1.get({did: url, mode, hostname});
      return doc;
    }
    return docLoader(url);
  };
});
