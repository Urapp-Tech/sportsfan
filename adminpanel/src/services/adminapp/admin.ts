import { BACKOFFICE_PREFIX } from '@/utils/constants';
import network from '@/utils/network';

const loginService = (userData: { identifier: string; password: string }) => {
  return network.post(`${BACKOFFICE_PREFIX}/login`, userData);
};

const systemConfig = (domain: string) => {
  return network.get(`get/${domain}`, {}, 'system');
};

export default {
  loginService,
  systemConfig,
};
