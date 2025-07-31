export class UrlHelper {
  static idFromUrl(url: string): number {
    const urlParts = url.split('/');
    return parseInt(urlParts[urlParts.length - 1]);
  }
}
