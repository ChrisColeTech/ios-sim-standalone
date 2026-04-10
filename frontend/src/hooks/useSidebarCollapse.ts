import { useState } from 'react';

export function useSidebarCollapse() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return {
    isCollapsed,
    collapse: () => setIsCollapsed(true),
    expand: () => setIsCollapsed(false)
  };
}
