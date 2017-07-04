/*!
 * Bedrock DID Client Module.
 *
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const bedrock = require('bedrock');
const config = bedrock.config;
const didio = require('did-io')();
const jsonld = bedrock.jsonld();

require('./config');

const api = {};
module.exports = api;

api.jsonld = jsonld;

didio.use('jsonld', api.jsonld);

api.jsonld.documentLoader = didio.createDocumentLoader({
  wrap: (url, callback) => bedrock.jsonld.documentLoader(url, callback),
  baseUrl: config['did-client']['authorization-io'].didBaseUrl + '/'
});
