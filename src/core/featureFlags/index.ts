// Parse flags from URL query param ?ftrs=flag1:true,flag2:false
function parseFlagsFromUrl(): Record<string, boolean> {
  const params = new URLSearchParams(window.location.search);
  const ftrs = params.get('ftrs');
  if (!ftrs) return {};

  return ftrs.split(',').reduce<Record<string, boolean>>((acc, pair) => {
    const [key, value] = pair.trim().split(':');
    if (key && value !== undefined) {
      acc[key.trim()] = value.trim() === 'true';
    }
    return acc;
  }, {});
}

const flags = parseFlagsFromUrl();

export function getFlag(name: string, defaultValue = false): boolean {
  if (name in flags) return flags[name];
  return defaultValue;
}

export const FLAGS = {
  MOCK_AUTH: 'mock_auth',
  MOCK_FEED: 'mock_feed',
  MOCK_APPLY: 'mock_apply',
  MOCK_PROFILE: 'mock_profile',
} as const;
