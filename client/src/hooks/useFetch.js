import { useEffect, useState, useMemo } from "react";

const useFetch = (apiCall, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const memoizedDeps = useMemo(() => [apiCall, ...deps], [apiCall, ...deps]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiCall();
        if (isMounted) setData(res.data);
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, memoizedDeps);

  return { data, loading, error };
};

export default useFetch;