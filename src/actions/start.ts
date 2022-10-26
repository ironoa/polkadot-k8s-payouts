import { Client } from '../client';
import { Config } from '@w3f/config';

import { InputConfig } from '../types';
import { LoggerSingleton } from '../logger';
import { Claimer } from '../claimer';


export async function startAction(cmd): Promise<void> {
    const cfg = new Config<InputConfig>().parse(cmd.config);

    const logger = LoggerSingleton.getInstance(cfg.logLevel)

    const api = await new Client(cfg).connect()

    const claimer = new Claimer(cfg, api);

    try {
        await claimer.run();
        process.exit(0);
    } catch (e) {
        logger.error(`During claimer run: ${e.toString()}`);
        process.exit(-1);
    }
}
