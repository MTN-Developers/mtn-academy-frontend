// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { locales } from "./settings";
// import { locales } from './settings';

export default getRequestConfig(async ({ locale }) => {
  return {
    messages: (await import(`../messages/${locales}.json`)).default,
  };
});
