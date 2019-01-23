/*!
 * Copyright (c) 2017-2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const bedrock = require('bedrock');
const config = bedrock.config;
const cc = bedrock.util.config.main.computer();

const cfg = config['did-client'] = {};
const methods = cfg.methods = {};

const v1 = methods['veres-one'] = {};
v1.mode = 'test';
v1.hostname = null;

// TODO: deprecate all usage of `authorization.io`, no longer used at all

// authorization.io config
const authio = config['did-client']['authorization-io'] = {
  environment: 'development' // options: 'development', 'production'
};

cc('did-client.authorization-io.baseUrl', () =>
  authio.environment === 'production' ?
    'https://authorization.io' :
    'https://authorization.localhost:33443');
cc('did-client.authorization-io.agentUrl', () => authio.baseUrl + '/agent');
cc('did-client.authorization-io.registerUrl',
  () => authio.baseUrl + '/register');
cc('did-client.authorization-io.didBaseUrl', () => authio.baseUrl + '/dids');
