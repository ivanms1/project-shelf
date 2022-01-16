import { TOKEN_NAME } from '../const';
import isWindowPresent from './isWindowPresent';

function getAuthToken() {
  if (isWindowPresent()) {
    return localStorage.getItem(TOKEN_NAME);
  }

  return undefined;
}

export function setAuthToken(token: string) {
  if (isWindowPresent()) {
    return localStorage.setItem(TOKEN_NAME, token);
  }
}

export default getAuthToken;
