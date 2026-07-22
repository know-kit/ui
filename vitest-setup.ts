// 引入 jest-dom 匹配器, 确保 `toBeInTheDocument` 以及其他来自 `@testing-library/jest-dom` 的匹配器在 Vitest 中正常使用。
import '@testing-library/jest-dom/vitest';

// 自动清理 DOM，防止测试间污染
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
