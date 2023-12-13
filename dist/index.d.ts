import { Signature, Call, AccountInterface } from 'starknet';

declare const STAGING_BASE_URL = "https://goerli.api.avnu.fi";
declare const BASE_URL = "https://starknet.api.avnu.fi";
declare const AVNU_ADDRESS: {
    [chainId: string]: string;
};

interface Pageable {
    page?: number;
    size?: number;
    sort?: string;
}
type GetTokensRequest = Pageable;
interface GetPairsRequest extends Pageable {
    token?: string;
}
interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}
interface Token {
    name: string;
    address: string;
    symbol: string;
    decimals: number;
    chainId: string;
    logoUri: string;
}
interface Pair {
    token1: Token;
    token2: Token;
}
interface PriceRequest {
    sellTokenAddress: string;
    buyTokenAddress: string;
    sellAmount: bigint;
}
interface QuoteRequest {
    sellTokenAddress: string;
    buyTokenAddress: string;
    sellAmount: bigint;
    takerAddress?: string;
    size?: number;
    excludeSources?: string[];
    integratorFees?: bigint;
    integratorFeeRecipient?: string;
    integratorName?: string;
    mode?: 'CLASSIC' | 'TURBO';
}
interface Route {
    name: string;
    address: string;
    percent: number;
    sellTokenAddress: string;
    buyTokenAddress: string;
    routeInfo?: Map<string, string>;
    routes: Route[];
}
interface Price {
    sellTokenAddress: string;
    sellAmount: bigint;
    sellAmountInUsd: number;
    buyTokenAddress: string;
    buyAmount: bigint;
    buyAmountInUsd: number;
    blockNumber?: number;
    chainId: string;
    sourceName: string;
    priceRatioUsd: number;
    gasFees: bigint;
    gasFeesInUsd: number;
}
interface Quote {
    quoteId: string;
    sellTokenAddress: string;
    sellAmount: bigint;
    sellAmountInUsd: number;
    buyTokenAddress: string;
    buyAmount: bigint;
    buyAmountInUsd: number;
    buyAmountWithoutFees: bigint;
    buyAmountWithoutFeesInUsd: number;
    blockNumber?: number;
    chainId: string;
    expiry?: number;
    routes: Route[];
    gasFees: bigint;
    gasFeesInUsd: number;
    avnuFees: bigint;
    avnuFeesInUsd: number;
    avnuFeesBps: bigint;
    integratorFees: bigint;
    integratorFeesInUsd: number;
    integratorFeesBps: bigint;
    priceRatioUsd: number;
    sellTokenPriceInUsd?: number;
    buyTokenPriceInUsd?: number;
    liquiditySource: 'DEX_AGGREGATOR' | 'MARKET_MAKER' | 'SOLVER';
    suggestedSolution?: SuggestedSolution;
}
interface SuggestedSolution {
    sellAmount: bigint;
    sellAmountInUsd?: number;
    buyAmount: bigint;
    buyAmountInUsd?: number;
}
interface InvokeSwapResponse {
    transactionHash: string;
}
interface RequestError {
    messages: string[];
}
interface AvnuOptions {
    baseUrl?: string;
    dev?: boolean;
    abortSignal?: AbortSignal;
    avnuPublicKey?: string;
}
interface ExecuteSwapOptions {
    executeApprove?: boolean;
    gasless?: boolean;
    takerSignature?: Signature;
    slippage?: number;
}
interface BuildSwapTransaction extends Call {
    chainId: string;
}
declare enum SourceType {
    DEX = "DEX",
    MARKET_MAKER = "MARKET_MAKER",
    SOLVER = "SOLVER"
}
interface Source {
    name: string;
    address: string;
    icon?: string;
    type: SourceType;
}

declare const aPriceRequest: () => PriceRequest;
declare const aQuoteRequest: () => QuoteRequest;
declare const aPrice: () => Price;
declare const aQuote: () => Quote;
declare const aQuoteWithManySubRoutes: () => Quote;
declare const aQuoteWithManyComplexRoutes: () => Quote;
declare const anInvokeSwapResponse: () => InvokeSwapResponse;
declare const aBuildSwapTransaction: () => BuildSwapTransaction;
declare const ethToken: () => Token;
declare const btcToken: () => Token;
declare const aPair: () => Pair;
declare const aPage: <T>(content: T[], size?: number, number?: number, totalPages?: number, totalElements?: number) => Page<T>;
declare const aSource: () => Source;

/**
 * Fetches the prices of DEX applications.
 * It allows to find the prices of AMM without any path optimization. It allows to measure the performance of the results from the getQuotes endpoints. The prices are sorted (best first).
 *
 * @param request: The request params for the avnu API `/swap/v1/prices` endpoint.
 * @param options: Optional options.
 * @returns The best quotes
 */
declare const fetchPrices: (request: PriceRequest, options?: AvnuOptions) => Promise<Price[]>;
/**
 * Fetches the best quotes.
 * It allows to find the best quotes from on-chain and off-chain liquidity. The best quotes will be returned and are sorted (best first).
 *
 * @param request: The request params for the avnu API `/swap/v1/quotes` endpoint.
 * @param options: Optional options.
 * @returns The best quotes
 */
declare const fetchQuotes: (request: QuoteRequest, options?: AvnuOptions) => Promise<Quote[]>;
/**
 * Executing the exchange through AVNU router
 *
 * @param quoteId: The id of the selected quote
 * @param takerSignature: Taker's signature.
 * @param nonce: Taker's address nonce. See `buildGetNonce`
 * @param takerAddress: Required when taker address was not provided during the quote request
 * @param slippage: The maximum acceptable slippage of the buyAmount amount. Default value is 5%. 0.05 is 5%.
 * This value is ignored if slippage is not applicable to the selected quote
 * @param options: Optional options.
 * @returns The transaction hash
 */
declare const fetchExecuteSwapTransaction: (quoteId: string, takerSignature: Signature, nonce: string, takerAddress?: string, slippage?: number, options?: AvnuOptions) => Promise<InvokeSwapResponse>;
/**
 * Build data for executing the exchange through AVNU router
 * It allows trader to build the data needed for executing the exchange on AVNU router
 *
 * @param quoteId: The id of the selected quote
 * @param nonce: Taker's address nonce. See `buildGetNonce`. Warning: the nonce mechanism will change
 * @param takerAddress: Required when taker address was not provided during the quote request
 * @param slippage: The maximum acceptable slippage of the buyAmount amount. Default value is 5%. 0.05 is 5%.
 * This value is ignored if slippage is not applicable to the selected quote
 * @param options: Optional options.
 * @returns The calldata
 */
declare const fetchBuildExecuteTransaction: (quoteId: string, nonce?: string, takerAddress?: string, slippage?: number, options?: AvnuOptions) => Promise<BuildSwapTransaction>;
/**
 * Fetches the supported tokens.
 *
 * @param request: The request params for the avnu API `/swap/v1/tokens` endpoint.
 * @param options: Optional options.
 * @returns The best quotes
 */
declare const fetchTokens: (request?: GetTokensRequest, options?: AvnuOptions) => Promise<Page<Token>>;
/**
 * Fetches the supported sources
 *
 * @param options: Optional options.
 * @returns The sources
 */
declare const fetchSources: (options?: AvnuOptions) => Promise<Source[]>;
/**
 * Verifies if the address is whitelisted
 * Throws an error when the contractAddress is not whitelisted
 *
 * @param contractAddress: The address to check
 * @param chainId: The chainId
 */
declare const checkContractAddress: (contractAddress: string, chainId: string, dev?: boolean) => void;
/**
 * Build approve call
 *
 * @param sellTokenAddress: The sell token address
 * @param sellAmount: The sell amount
 * @param chainId: The chainId
 * @param dev: Specify if you need to use the dev environment  * @returns Call
 */
declare const buildApproveTx: (sellTokenAddress: string, sellAmount: bigint, chainId: string, dev?: boolean) => Call;
/**
 * Build getNonce call
 *
 * @param takerAddress: The taker's address
 * @param chainId: The chainId
 * @param dev: Specify if you need to use the dev environment
 * @returns Call
 */
declare const buildGetNonce: (takerAddress: string, chainId: string, dev?: boolean) => Call;
/**
 * Sign the quote
 * The signature will be used in the AVNU contract
 *
 * @param account: The account of the trader
 * @param quote: The selected quote. See `getQuotes`
 * @param nonce: Taker's address nonce. See `buildGetNonce`
 * @param chainId: The chainId
 * @returns Call
 */
declare const signQuote: (account: AccountInterface, quote: Quote, nonce: string, chainId: string) => Promise<Signature>;
declare const hashQuote: (accountAddress: string, quote: Quote, nonce: string, chainId: string) => string;
/**
 * Execute the exchange
 *
 * @param account: The account of the trader
 * @param quote: The selected quote. See `getQuotes`
 * @param nonce: Taker's address nonce. See `buildGetNonce`
 * @param executeApprove: False if the taker already executed `approve`
 * @param gasless: False if the user wants to execute the transaction himself
 * @param takerSignature: Optional: the function will ask the user tu sign the quote if param is undefined
 * @param slippage: The maximum acceptable slippage of the buyAmount amount. Default value is 5%. 0.05 is 5%.
 * This value is ignored if slippage is not applicable to the selected quote
 * @param options: Optional options.
 * @returns Promise<InvokeSwapResponse>
 */
declare const executeSwap: (account: AccountInterface, quote: Quote, { executeApprove, gasless, takerSignature, slippage }?: ExecuteSwapOptions, options?: AvnuOptions) => Promise<InvokeSwapResponse>;
/**
 * Calculate the min amount received from amount and slippage
 *
 * @param amount: The amount to apply slippage
 * @param slippage: The slippage to apply in bps. 10 is 0.1%
 * @returns bigint
 */
declare const calculateMinAmount: (amount: bigint, slippage: number) => bigint;

export { AVNU_ADDRESS, AvnuOptions, BASE_URL, BuildSwapTransaction, ExecuteSwapOptions, GetPairsRequest, GetTokensRequest, InvokeSwapResponse, Page, Pageable, Pair, Price, PriceRequest, Quote, QuoteRequest, RequestError, Route, STAGING_BASE_URL, Source, SourceType, SuggestedSolution, Token, aBuildSwapTransaction, aPage, aPair, aPrice, aPriceRequest, aQuote, aQuoteRequest, aQuoteWithManyComplexRoutes, aQuoteWithManySubRoutes, aSource, anInvokeSwapResponse, btcToken, buildApproveTx, buildGetNonce, calculateMinAmount, checkContractAddress, ethToken, executeSwap, fetchBuildExecuteTransaction, fetchExecuteSwapTransaction, fetchPrices, fetchQuotes, fetchSources, fetchTokens, hashQuote, signQuote };
