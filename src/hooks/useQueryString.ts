import { SearchParams } from "nuqs";
import { useSyncedSearchQuery } from "./useSyncedSearchQuery";
import { useCallback, useEffect, useState } from "react";

export function useQueryString(initialSearch: SearchParams) {
  const { searchQuery, queryString } = useSyncedSearchQuery(initialSearch);
  const [localQueryString, setLocalQueryString] = useState(queryString);

  const handleFilterSubmit = useCallback(() => {
    setLocalQueryString(queryString);
  }, [queryString]);

  const { sort, page, limit } = searchQuery;

  const stringifiedQuery = JSON.stringify({ sort, page, limit });

  useEffect(() => {
    handleFilterSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stringifiedQuery]);

  return { handleFilterSubmit, queryString: localQueryString };
}
