export class UrlHelper {
  public static idFromUrl(url: string): number {
    const urlParts = url.split('/');
    return parseInt(urlParts[urlParts.length - 1]);
  }
}
