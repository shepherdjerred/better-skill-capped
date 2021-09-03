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
    const timestame = this.getTime();
    const now = new Date();
    return timestame.getHours() - now.getHours() > 2;
  }

  private setTime(date: Date): void {
    window.localStorage.setItem(TIMESTAMP, JSON.stringify(date.valueOf()));
  }

  private getTime(): Date {
    return new Date(window.localStorage.getItem(TIMESTAMP) as string);
  }
}
