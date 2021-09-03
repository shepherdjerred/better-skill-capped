import { LocalStorageManifestDatastore } from "./datastore/LocalStorageManifestDatastore";
import axios from "axios";
import { Manifest } from "./parser/Manifest";

export class ManifestLoader {
  async load(): Promise<Manifest> {
    const datastore = new LocalStorageManifestDatastore();
    if (!datastore.get() || datastore.isStale()) {
      console.log("Fetching response...");
      const response = await axios.get("/skill-capped-manifest.json");
      const manifest = response.data as Manifest;

      console.log(manifest);
      datastore.set(manifest);
    }

    console.log(datastore.get());
    return datastore.get() as Manifest;
  }
}
