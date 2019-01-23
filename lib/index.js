/*!
 * Bedrock DID Client Module.
 *
 * Copyright (c) 2017-2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const bedrock = require('bedrock');
const {config, jsonld} = bedrock;
const didio = require('did-io');

require('./config');

const api = {};
module.exports = api;

api.jsonld = jsonld;

bedrock.events.on('bedrock.init', () => {
  const cfg = config['did-client'];

  // ensure jsonld can look up DIDs
  const docLoader = bedrock.jsonld.documentLoader;
  const v1 = didio.methods.veres();
  jsonld.documentLoader = async url => {
    if(url.startsWith('did:v1:')) {
      const {mode, hostname} = cfg.methods['veres-one'];
      const {doc} = await v1.get({did: url, mode, hostname});
      return {
        contextUrl: null,
        documentUrl: url,
        document: doc
      };
    }
    return docLoader(url);
  };
});
