import { useRouter } from "next/router";
import { useState, useEffect } from "react";


function IncrementQueryParamCountButton() {
  const router = useRouter();
  const [count, setCount] = useState(0);

  function incrementCount(e) {
    e.preventDefault();
    setCount(count+1);
  }

  /*
    Everytime the count is updated, update the query param for count.
  */
  useEffect(() => {
    const queryParams = {'count': count}

    const newQueryParams = new URLSearchParams(location.search);
    Object.entries(queryParams).forEach(([key, value]) => {
      newQueryParams.set(encodeURIComponent(key), encodeURIComponent(value));
    });


    router.replace(
      {
        pathname: router.pathname,
        query: Object.fromEntries(newQueryParams.entries())
      },
      `${window.location.pathname}?${newQueryParams.toString()}`,
      { shallow: true, shouldNotRedraw: true }
    )
  }, [count])

  return (
    <button onClick={incrementCount}>
      Current Count: {count}
    </button>
  )
}

export default IncrementQueryParamCountButton;
