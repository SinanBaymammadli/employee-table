import { useLocation, useHistory } from "react-router-dom";
import * as queryString from "query-string";

export function useSearchParams<T>(defaultParams?: T): [T, (params?: Partial<T>) => void] {
  const history = useHistory();
  const location = useLocation();
  const params = queryString.parse(location.search?.trim().replace(/^[?#&]/, ""));

  function setSearchParams(p?: Partial<T>): void {
    history.push({
      ...location,
      search: queryString.stringify({ ...p } as any),
    });
  }

  return [{ ...(defaultParams ?? {}), ...params } as any, setSearchParams];
}

export function getPaginatedItems<T>(items: T[], page = 1, pageSize = 50) {
  const offset = (page - 1) * pageSize;
  const pagedItems = items.slice(offset, offset + pageSize);

  return {
    page,
    pageSize,
    total: items.length,
    totalPages: Math.ceil(items.length / pageSize),
    data: pagedItems,
  };
}

export function includes(a: string, b: string) {
  return a.toLowerCase().includes(b.toLowerCase());
}
