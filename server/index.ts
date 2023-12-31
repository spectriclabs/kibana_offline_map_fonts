import { PluginInitializerContext } from '../../../src/core/server';
import { KibanaOfflineMapFontsPlugin } from './plugin';

//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new KibanaOfflineMapFontsPlugin(initializerContext);
}

export type { KibanaOfflineMapFontsPluginSetup, KibanaOfflineMapFontsPluginStart } from './types';
