import { defineStore } from 'pinia';

export const useSystemInfoStore = defineStore('systemInfo', {
	state: () => {
		return { systemInfo: null };
	},
	actions: {
		setSystemInfo(systemInfo) {
			this.systemInfo = systemInfo;
		},
	},
});