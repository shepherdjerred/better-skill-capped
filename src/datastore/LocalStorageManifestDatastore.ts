import { Manifest } from "../parser/Manifest";

const IDENTIFIER = "content";
const TIMESTAMP = IDENTIFIER + "-timestamp";

export class LocalStorageManifestDatastore {
  set(manifest: Manifest): void {
    window.localStorage.setItem(IDENTIFIER, JSON.stringify(manifest));
    this.setTime(new Date());
  }

  get(): Manifest | undefined {
    if (window.localStorage.getItem(IDENTIFIER)) {
      return JSON.parse(window.localStorage.getItem(IDENTIFIER) as string) as Manifest;
    } else {
      return undefined;
    }
  }

  isStale(): boolean {
    return true;
  }

  private setTime(date: Date): void {
    window.localStorage.setItem(TIMESTAMP, JSON.stringify(date.valueOf()));
  }
}
