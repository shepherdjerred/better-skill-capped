import { LocalStorageManifestDatastore } from "./datastore/LocalStorageManifestDatastore";
import axios from "axios";
import { Manifest } from "./parser/Manifest";

export class ManifestLoader {
  async load(): Promise<Manifest> {
    const datastore = new LocalStorageManifestDatastore();
    if (!datastore.get() || datastore.isStale()) {
      const response = await axios.get("https://manifest.better-skill-capped.com/manifest.json");
      const manifest = response.data as Manifest;

      datastore.set(manifest);
    }

    return datastore.get() as Manifest;
  }
}
