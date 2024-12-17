/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as files from "../files.js";
import type * as links from "../links.js";
import type * as recuperaSenha from "../recuperaSenha.js";
import type * as seletiva from "../seletiva.js";
import type * as socialIcons from "../socialIcons.js";
import type * as telaLinks from "../telaLinks.js";
import type * as todo from "../todo.js";
import type * as transacao from "../transacao.js";
import type * as user from "../user.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  files: typeof files;
  links: typeof links;
  recuperaSenha: typeof recuperaSenha;
  seletiva: typeof seletiva;
  socialIcons: typeof socialIcons;
  telaLinks: typeof telaLinks;
  todo: typeof todo;
  transacao: typeof transacao;
  user: typeof user;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
