// host constants
const DEVELOPMENT = 'http://localhost:8000';
const PRODUCTION = 'https://time-buddy-app-zqdu8.ondigitalocean.app';

// support uri constants
const SUPPORT = '/support';
const QUESTION_ANSWER = `${SUPPORT}/question-answer`;

// organisation uri constants
const ORGS = '/organisations';

// events uri constants
const EVENTS = '/events/events';

// utility functions
export const urlBuilder =
  (host: string) => (uri: string) => (queryParams?: string) =>
    `${host}${uri}${queryParams ?? ''}`;

export const devBuilder = urlBuilder(DEVELOPMENT);
export const prodBuilder = urlBuilder(PRODUCTION);

export const reqUriBuilder = prodBuilder;

// support urls
export const questionUrlBuilder = reqUriBuilder(QUESTION_ANSWER);
export const orgsUrlBuilder = reqUriBuilder(ORGS);
export const eventsUrlBuilder = reqUriBuilder(EVENTS);
