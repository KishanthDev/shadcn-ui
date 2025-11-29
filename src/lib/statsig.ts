import { Statsig, StatsigUser } from '@statsig/statsig-node-core';

let statsigInstance: Statsig | null = null;

export async function getStatsigServer() {
  if (!statsigInstance) {
    statsigInstance = new Statsig(process.env.STATSIG_SERVER_KEY!);
    await statsigInstance.initialize();
    console.log('✓ Statsig Server Initialized');
  }
  return statsigInstance;
}

export function getStatsigUser(userID: string = 'kisna-123') {
  return new StatsigUser({ userID });
}
