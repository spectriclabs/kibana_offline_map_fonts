import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../src/core/server';

import { KibanaOfflineMapFontsPluginSetup, KibanaOfflineMapFontsPluginStart } from './types';
import { defineRoutes } from './routes';
import { schema } from '@kbn/config-schema';

export class KibanaOfflineMapFontsPlugin
  implements Plugin<KibanaOfflineMapFontsPluginSetup, KibanaOfflineMapFontsPluginStart>
{
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('kibanaOfflineMapFonts: Setup');
    const setVersion = (version:string) =>{
      const name = "acecard:plugin"+ this.constructor.name;
      const versionSettings:any = {}
      versionSettings[name] = {
        name,
        description: `Commit id and message for ${this.constructor.name} version readonly do not change`,
        category: ['acecard'],
        order: 1,
        type: 'string',
        value: version,
        readonly:false,
        requiresPageReload: false,
        schema: schema.string(),
      }
      core.uiSettings.register(versionSettings);
    }
    import("../common/version").then((version)=>{
      setVersion(version.version)
    }).catch(()=>{
      setVersion("UNKNOWN")
    })

    const router = core.http.createRouter();

    // Register server side APIs
    defineRoutes(router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('kibanaOfflineMapFonts: Started');
    return {};
  }

  public stop() {}
}
