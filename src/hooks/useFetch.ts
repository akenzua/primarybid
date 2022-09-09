import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T[]>();
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((results) => results.json())
      .then((data) => setData(data))
      .catch((error) => setHasError(true));
    setLoading(false);
  }, [data, hasError, loading, url]);

  return { data, loading, hasError };
}
