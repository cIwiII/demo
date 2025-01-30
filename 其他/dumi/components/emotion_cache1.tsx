import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import React from 'react';

const myCache = createCache({
  // 必须配置 prefix，增大 n * 1 个字节的体积
  key: 'x',
  speedy: false,
});

const {sheet} = myCache;


export default function App() {
  return <CacheProvider value={myCache}>{/* ... */}</CacheProvider>;
}
