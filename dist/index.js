"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AVNU_ADDRESS: () => AVNU_ADDRESS,
  BASE_URL: () => BASE_URL,
  STAGING_BASE_URL: () => STAGING_BASE_URL,
  SourceType: () => SourceType,
  aBuildSwapTransaction: () => aBuildSwapTransaction,
  aPage: () => aPage,
  aPair: () => aPair,
  aPrice: () => aPrice,
  aPriceRequest: () => aPriceRequest,
  aQuote: () => aQuote,
  aQuoteRequest: () => aQuoteRequest,
  aQuoteWithManyComplexRoutes: () => aQuoteWithManyComplexRoutes,
  aQuoteWithManySubRoutes: () => aQuoteWithManySubRoutes,
  aSource: () => aSource,
  anInvokeSwapResponse: () => anInvokeSwapResponse,
  btcToken: () => btcToken,
  buildApproveTx: () => buildApproveTx,
  buildGetNonce: () => buildGetNonce,
  calculateMinAmount: () => calculateMinAmount,
  checkContractAddress: () => checkContractAddress,
  ethToken: () => ethToken,
  executeSwap: () => executeSwap,
  fetchBuildExecuteTransaction: () => fetchBuildExecuteTransaction,
  fetchExecuteSwapTransaction: () => fetchExecuteSwapTransaction,
  fetchPrices: () => fetchPrices,
  fetchQuotes: () => fetchQuotes,
  fetchSources: () => fetchSources,
  fetchTokens: () => fetchTokens,
  hashQuote: () => hashQuote,
  signQuote: () => signQuote
});
module.exports = __toCommonJS(src_exports);

// src/constants.ts
var import_starknet = require("starknet");
var STAGING_BASE_URL = "https://goerli.api.avnu.fi";
var BASE_URL = "https://starknet.api.avnu.fi";
var AVNU_ADDRESS = {
  [import_starknet.constants.StarknetChainId.SN_MAIN]: "0x4270219d365d6b017231b52e92b3fb5d7c8378b05e9abc97724537a80e93b0f",
  [`${import_starknet.constants.StarknetChainId.SN_MAIN}-dev`]: "0x33c21d4cd5db846109448b3e827d175e50b6d449387f76ca7f91a881edca44b",
  [import_starknet.constants.StarknetChainId.SN_GOERLI]: "0x7e36202ace0ab52bf438bd8a8b64b3731c48d09f0d8879f5b006384c2f35032",
  [`${import_starknet.constants.StarknetChainId.SN_GOERLI}-dev`]: "0x6d8cd321dcbbf54512eab67c8a6849faf920077a3996f40bb4761adc4f021d2"
};

// src/fixtures.ts
var import_ethers = require("ethers");
var import_starknet2 = require("starknet");

// src/types.ts
var SourceType = /* @__PURE__ */ ((SourceType2) => {
  SourceType2["DEX"] = "DEX";
  SourceType2["MARKET_MAKER"] = "MARKET_MAKER";
  SourceType2["SOLVER"] = "SOLVER";
  return SourceType2;
})(SourceType || {});

// src/fixtures.ts
var aPriceRequest = () => ({
  sellTokenAddress: "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  sellAmount: (0, import_ethers.parseUnits)("1", 18),
  buyTokenAddress: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7"
});
var aQuoteRequest = () => ({
  sellTokenAddress: "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  sellAmount: (0, import_ethers.parseUnits)("1", 18),
  buyTokenAddress: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7",
  size: 1,
  takerAddress: "0x0"
});
var aPrice = () => ({
  sellTokenAddress: "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  sellAmount: (0, import_ethers.parseUnits)("1", 18),
  sellAmountInUsd: 1700,
  buyTokenAddress: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7",
  buyAmount: (0, import_ethers.parseUnits)("2", 18),
  buyAmountInUsd: 1700,
  blockNumber: 1,
  chainId: import_starknet2.constants.StarknetChainId.SN_GOERLI,
  sourceName: "AMM1",
  priceRatioUsd: 0,
  gasFees: BigInt(0),
  gasFeesInUsd: 0
});
var aQuote = () => ({
  quoteId: "quoteId",
  sellTokenAddress: "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  sellAmount: (0, import_ethers.parseUnits)("1", 18),
  sellAmountInUsd: 1700,
  buyTokenAddress: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7",
  buyAmount: (0, import_ethers.parseUnits)("2", 18),
  buyAmountInUsd: 1700,
  buyAmountWithoutFees: (0, import_ethers.parseUnits)("2", 18),
  buyAmountWithoutFeesInUsd: 1700,
  blockNumber: 1,
  chainId: import_starknet2.constants.StarknetChainId.SN_GOERLI,
  expiry: 1e11,
  routes: [
    {
      name: "AMM1",
      address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c661",
      percent: 1,
      sellTokenAddress: "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
      buyTokenAddress: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7",
      routes: []
    }
  ],
  gasFees: BigInt("0x0"),
  gasFeesInUsd: 0,
  avnuFees: BigInt("0x0"),
  avnuFeesInUsd: 0,
  avnuFeesBps: BigInt("0x0"),
  integratorFees: BigInt("0x0"),
  integratorFeesInUsd: 0,
  integratorFeesBps: BigInt("0x0"),
  priceRatioUsd: 0,
  liquiditySource: "DEX_AGGREGATOR",
  suggestedSolution: void 0
});
var aQuoteWithManySubRoutes = () => ({
  quoteId: "quoteId",
  sellTokenAddress: "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  sellAmount: (0, import_ethers.parseUnits)("1", 18),
  sellAmountInUsd: 1700,
  buyTokenAddress: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7",
  buyAmount: (0, import_ethers.parseUnits)("2", 18),
  buyAmountInUsd: 1700,
  buyAmountWithoutFees: (0, import_ethers.parseUnits)("2", 18),
  buyAmountWithoutFeesInUsd: 1700,
  blockNumber: 1,
  chainId: import_starknet2.constants.StarknetChainId.SN_GOERLI,
  expiry: 1e11,
  priceRatioUsd: 0,
  liquiditySource: "DEX_AGGREGATOR",
  routes: [
    {
      name: "AMM1",
      address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c661",
      percent: 1,
      sellTokenAddress: "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
      buyTokenAddress: "0x3e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9",
      routes: [
        {
          name: "AMM2",
          address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c662",
          percent: 1,
          sellTokenAddress: "0x3e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9",
          buyTokenAddress: "0x2e2faab2cad8ecdde5e991798673ddcc08983b872304a66e5f99fbb24e14abc",
          routes: [
            {
              name: "AMM1",
              address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c661",
              percent: 1,
              sellTokenAddress: "0x2e2faab2cad8ecdde5e991798673ddcc08983b872304a66e5f99fbb24e14abc",
              buyTokenAddress: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7",
              routes: []
            }
          ]
        }
      ]
    }
  ],
  gasFees: BigInt("0x0"),
  gasFeesInUsd: 0,
  avnuFees: BigInt("0x0"),
  avnuFeesInUsd: 0,
  avnuFeesBps: BigInt("0x0"),
  integratorFees: BigInt("0x0"),
  integratorFeesInUsd: 0,
  integratorFeesBps: BigInt("0x0"),
  suggestedSolution: void 0
});
var aQuoteWithManyComplexRoutes = () => ({
  quoteId: "quoteId",
  sellTokenAddress: "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  sellAmount: (0, import_ethers.parseUnits)("1", 18),
  sellAmountInUsd: 1700,
  buyTokenAddress: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7",
  buyAmount: (0, import_ethers.parseUnits)("2", 18),
  buyAmountInUsd: 1700,
  buyAmountWithoutFees: (0, import_ethers.parseUnits)("2", 18),
  buyAmountWithoutFeesInUsd: 1700,
  blockNumber: 1,
  chainId: import_starknet2.constants.StarknetChainId.SN_GOERLI,
  expiry: 1e11,
  gasFees: BigInt("0x0"),
  gasFeesInUsd: 0,
  avnuFees: BigInt("0x0"),
  avnuFeesInUsd: 0,
  avnuFeesBps: BigInt("0x0"),
  integratorFees: BigInt("0x0"),
  integratorFeesInUsd: 0,
  integratorFeesBps: BigInt("0x0"),
  priceRatioUsd: 0,
  liquiditySource: "DEX_AGGREGATOR",
  routes: [
    {
      name: "AMM1",
      address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c661",
      percent: 0.5,
      sellTokenAddress: "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
      buyTokenAddress: "0x3e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9",
      routes: [
        {
          name: "AMM2",
          address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c662",
          percent: 0.5,
          sellTokenAddress: "0x3e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9",
          buyTokenAddress: "0x2e2faab2cad8ecdde5e991798673ddcc08983b872304a66e5f99fbb24e14abc",
          routes: [
            {
              name: "AMM1",
              address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c661",
              percent: 1,
              sellTokenAddress: "0x2e2faab2cad8ecdde5e991798673ddcc08983b872304a66e5f99fbb24e14abc",
              buyTokenAddress: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7",
              routes: []
            }
          ]
        },
        {
          name: "AMM1",
          address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c661",
          percent: 0.5,
          sellTokenAddress: "0x3e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9",
          buyTokenAddress: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7",
          routes: []
        }
      ]
    },
    {
      name: "AMM1",
      address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c661",
      percent: 0.2,
      sellTokenAddress: "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
      buyTokenAddress: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7",
      routes: []
    },
    {
      name: "AMM1",
      address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c661",
      percent: 0.3,
      sellTokenAddress: "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
      buyTokenAddress: "0x3e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9",
      routes: [
        {
          name: "AMM2",
          address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c662",
          percent: 0.2,
          sellTokenAddress: "0x3e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9",
          buyTokenAddress: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7",
          routes: []
        },
        {
          name: "AMM1",
          address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c661",
          percent: 0.8,
          sellTokenAddress: "0x3e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9",
          buyTokenAddress: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7",
          routes: []
        }
      ]
    }
  ],
  suggestedSolution: void 0
});
var anInvokeSwapResponse = () => ({
  transactionHash: "0x0"
});
var aBuildSwapTransaction = () => ({
  chainId: import_starknet2.constants.StarknetChainId.SN_GOERLI,
  contractAddress: "0x0",
  entrypoint: "execute",
  calldata: []
});
var ethToken = () => ({
  name: "Ethereum",
  address: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  symbol: "ETH",
  decimals: 18,
  chainId: "0x534e5f474f45524c49",
  logoUri: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
});
var btcToken = () => ({
  name: "Wrapped Bitcoin",
  address: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7",
  symbol: "WBTC",
  decimals: 18,
  chainId: "0x534e5f474f45524c49",
  logoUri: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png"
});
var aPair = () => ({
  token1: ethToken(),
  token2: btcToken()
});
var aPage = (content, size = 10, number = 0, totalPages = 1, totalElements = 1) => ({
  content,
  size,
  totalPages,
  number,
  totalElements
});
var aSource = () => ({
  name: "AMM1",
  address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c661",
  icon: "https://pbs.twimg.com/profile_images/1567441002063069184/SGtDtW-C_400x400.jpg",
  type: "DEX" /* DEX */
});

// src/services.ts
var import_ethers2 = require("ethers");
var import_qs = __toESM(require("qs"));
var import_starknet3 = require("starknet");
var getBaseUrl = () => process.env.NODE_ENV === "dev" ? STAGING_BASE_URL : BASE_URL;
var parseResponse = (response, avnuPublicKey) => {
  if (response.status === 400) {
    return response.json().then((error) => {
      throw new Error(error.messages[0]);
    });
  }
  if (response.status > 400) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  if (avnuPublicKey) {
    const signature = response.headers.get("signature");
    if (!signature)
      throw new Error("No server signature");
    return response.clone().text().then((textResponse) => {
      const hashResponse = import_starknet3.hash.computeHashOnElements([import_starknet3.hash.starknetKeccak(textResponse)]);
      const formattedSig = signature.split(",").map((s) => BigInt(s));
      const signatureType = new import_starknet3.ec.starkCurve.Signature(formattedSig[0], formattedSig[1]);
      if (!import_starknet3.ec.starkCurve.verify(signatureType, hashResponse, avnuPublicKey))
        throw new Error("Invalid server signature");
    }).then(() => response.json());
  }
  return response.json();
};
var fetchPrices = (request, options) => {
  const queryParams = import_qs.default.stringify({ ...request, sellAmount: (0, import_ethers2.toBeHex)(request.sellAmount) }, { arrayFormat: "repeat" });
  return fetch(`${options?.baseUrl ?? getBaseUrl()}/swap/v1/prices?${queryParams}`, {
    signal: options?.abortSignal,
    headers: { ...options?.avnuPublicKey !== void 0 && { "ask-signature": "true" } }
  }).then((response) => parseResponse(response, options?.avnuPublicKey)).then(
    (prices) => prices.map((price) => ({
      ...price,
      sellAmount: BigInt(price.sellAmount),
      buyAmount: BigInt(price.buyAmount),
      gasFees: BigInt(price.gasFees)
    }))
  );
};
var fetchQuotes = (request, options) => {
  const queryParams = import_qs.default.stringify(
    {
      ...request,
      sellAmount: (0, import_ethers2.toBeHex)(request.sellAmount),
      integratorFees: request.integratorFees ? (0, import_ethers2.toBeHex)(request.integratorFees) : void 0
    },
    { arrayFormat: "repeat" }
  );
  return fetch(`${options?.baseUrl ?? getBaseUrl()}/swap/v1/quotes?${queryParams}`, {
    signal: options?.abortSignal,
    headers: { ...options?.avnuPublicKey !== void 0 && { "ask-signature": "true" } }
  }).then((response) => parseResponse(response, options?.avnuPublicKey)).then(
    (quotes) => quotes.map((quote) => ({
      ...quote,
      sellAmount: BigInt(quote.sellAmount),
      buyAmount: BigInt(quote.buyAmount),
      buyAmountWithoutFees: BigInt(quote.buyAmountWithoutFees),
      gasFees: BigInt(quote.gasFees),
      avnuFees: BigInt(quote.avnuFees),
      integratorFees: BigInt(quote.integratorFees),
      avnuFeesBps: BigInt(quote.avnuFeesBps),
      integratorFeesBps: BigInt(quote.integratorFeesBps),
      suggestedSolution: quote.suggestedSolution ? {
        ...quote.suggestedSolution,
        sellAmount: BigInt(quote.suggestedSolution.sellAmount),
        buyAmount: BigInt(quote.suggestedSolution.buyAmount)
      } : void 0
    }))
  );
};
var fetchExecuteSwapTransaction = (quoteId, takerSignature, nonce, takerAddress, slippage, options) => {
  let signature = [];
  if (Array.isArray(takerSignature)) {
    signature = takerSignature.map((sig) => (0, import_ethers2.toBeHex)(BigInt(sig)));
  } else if (takerSignature.r && takerSignature.s) {
    signature = [(0, import_ethers2.toBeHex)(BigInt(takerSignature.r)), (0, import_ethers2.toBeHex)(BigInt(takerSignature.s))];
  }
  return fetch(`${options?.baseUrl ?? getBaseUrl()}/swap/v1/execute`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...options?.avnuPublicKey && { "ask-signature": "true" }
    },
    body: JSON.stringify({
      quoteId,
      takerAddress,
      nonce,
      slippage,
      takerSignature: signature
    })
  }).then((response) => parseResponse(response, options?.avnuPublicKey));
};
var fetchBuildExecuteTransaction = (quoteId, nonce, takerAddress, slippage, options) => fetch(`${options?.baseUrl ?? getBaseUrl()}/swap/v1/build`, {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...options?.avnuPublicKey && { "ask-signature": "true" }
  },
  body: JSON.stringify({ quoteId, takerAddress, nonce, slippage })
}).then((response) => parseResponse(response, options?.avnuPublicKey));
var fetchTokens = (request, options) => fetch(`${options?.baseUrl ?? getBaseUrl()}/swap/v1/tokens?${import_qs.default.stringify(request ?? {})}`, {
  signal: options?.abortSignal,
  headers: { ...options?.avnuPublicKey && { "ask-signature": "true" } }
}).then((response) => parseResponse(response, options?.avnuPublicKey));
var fetchSources = (options) => fetch(`${options?.baseUrl ?? getBaseUrl()}/swap/v1/sources`, {
  signal: options?.abortSignal,
  headers: { ...options?.avnuPublicKey && { "ask-signature": "true" } }
}).then((response) => parseResponse(response, options?.avnuPublicKey));
var checkContractAddress = (contractAddress, chainId, dev) => {
  if (!(dev ? AVNU_ADDRESS[`${chainId}-dev`] : AVNU_ADDRESS[chainId])?.includes(contractAddress)) {
    throw Error(`Contract ${contractAddress} is not whitelisted`);
  }
};
var buildApproveTx = (sellTokenAddress, sellAmount, chainId, dev) => {
  const value = import_starknet3.uint256.bnToUint256((0, import_ethers2.toBeHex)(sellAmount));
  return {
    contractAddress: sellTokenAddress,
    entrypoint: "approve",
    calldata: [dev ? AVNU_ADDRESS[`${chainId}-dev`] : AVNU_ADDRESS[chainId], value.low, value.high]
  };
};
var buildGetNonce = (takerAddress, chainId, dev) => ({
  contractAddress: dev ? AVNU_ADDRESS[`${chainId}-dev`] : AVNU_ADDRESS[chainId],
  entrypoint: "getNonce",
  calldata: [BigInt(takerAddress).toString()]
});
var signQuote = (account, quote, nonce, chainId) => account.signMessage({
  domain: { name: "AVNUFinance", version: "1", chainId },
  message: {
    taker_address: account.address,
    taker_token_address: quote.sellTokenAddress,
    taker_token_amount: (0, import_ethers2.toBeHex)(quote.sellAmount),
    maker_address: quote.routes[0].address,
    maker_token_address: quote.buyTokenAddress,
    maker_token_amount: (0, import_ethers2.toBeHex)(quote.buyAmount),
    nonce
  },
  primaryType: "TakerMessage",
  types: {
    StarkNetDomain: [
      { name: "name", type: "felt" },
      { name: "version", type: "felt" },
      { name: "chainId", type: "felt" }
    ],
    TakerMessage: [
      { name: "taker_address", type: "felt" },
      { name: "taker_token_address", type: "felt" },
      { name: "taker_token_amount", type: "felt" },
      { name: "maker_address", type: "felt" },
      { name: "maker_token_address", type: "felt" },
      { name: "maker_token_amount", type: "felt" },
      { name: "nonce", type: "felt" }
    ]
  }
});
var hashQuote = (accountAddress, quote, nonce, chainId) => import_starknet3.typedData.getMessageHash(
  {
    domain: { name: "AVNUFinance", version: "1", chainId },
    message: {
      taker_address: accountAddress,
      taker_token_address: quote.sellTokenAddress,
      taker_token_amount: (0, import_ethers2.toBeHex)(quote.sellAmount),
      maker_address: quote.routes[0].address,
      maker_token_address: quote.buyTokenAddress,
      maker_token_amount: (0, import_ethers2.toBeHex)(quote.buyAmount),
      nonce
    },
    primaryType: "TakerMessage",
    types: {
      StarkNetDomain: [
        { name: "name", type: "felt" },
        { name: "version", type: "felt" },
        { name: "chainId", type: "felt" }
      ],
      TakerMessage: [
        { name: "taker_address", type: "felt" },
        { name: "taker_token_address", type: "felt" },
        { name: "taker_token_amount", type: "felt" },
        { name: "maker_address", type: "felt" },
        { name: "maker_token_address", type: "felt" },
        { name: "maker_token_amount", type: "felt" },
        { name: "nonce", type: "felt" }
      ]
    }
  },
  accountAddress
);
var executeSwap = async (account, quote, { executeApprove = true, gasless = false, takerSignature, slippage } = {}, options) => {
  const chainId = await account.getChainId();
  if (chainId !== quote.chainId) {
    throw Error(`Invalid chainId`);
  }
  const approve = executeApprove ? buildApproveTx(quote.sellTokenAddress, quote.sellAmount, quote.chainId, options?.dev) : void 0;
  let nonce = void 0;
  if (quote.liquiditySource === "MARKET_MAKER" || gasless) {
    const getNonce = buildGetNonce(account.address, chainId, options?.dev);
    const response = await account.callContract(getNonce);
    nonce = response.result[0];
  }
  if (gasless) {
    if (approve)
      await account.execute([approve]);
    takerSignature = takerSignature ?? await signQuote(account, quote, nonce, quote.chainId);
    return fetchExecuteSwapTransaction(quote.quoteId, takerSignature, nonce, account.address, slippage, options);
  } else {
    return fetchBuildExecuteTransaction(quote.quoteId, nonce, account.address, slippage, options).then((call) => {
      checkContractAddress(call.contractAddress, call.chainId, options?.dev);
      return account.execute(approve ? [approve, call] : [call]);
    }).then((value) => ({ transactionHash: value.transaction_hash }));
  }
};
var calculateMinAmount = (amount, slippage) => amount - amount * BigInt(slippage) / BigInt(1e4);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AVNU_ADDRESS,
  BASE_URL,
  STAGING_BASE_URL,
  SourceType,
  aBuildSwapTransaction,
  aPage,
  aPair,
  aPrice,
  aPriceRequest,
  aQuote,
  aQuoteRequest,
  aQuoteWithManyComplexRoutes,
  aQuoteWithManySubRoutes,
  aSource,
  anInvokeSwapResponse,
  btcToken,
  buildApproveTx,
  buildGetNonce,
  calculateMinAmount,
  checkContractAddress,
  ethToken,
  executeSwap,
  fetchBuildExecuteTransaction,
  fetchExecuteSwapTransaction,
  fetchPrices,
  fetchQuotes,
  fetchSources,
  fetchTokens,
  hashQuote,
  signQuote
});
//# sourceMappingURL=index.js.map