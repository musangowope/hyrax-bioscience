import React from "react";
import axios from "axios";
import { hasValue } from "../functions/hasValue.func";

const baseRequestState = {
  loading: false,
  failed: false,
  success: false,
  response: {},
  errorData: null,
};

export default function useAxios(
  url = "",
  method = "get",
  config = null,
  loadingToSuccessDuration = 0
) {
  const [request, setRequestState] = React.useState(baseRequestState);
  const updateRequest = (obj = {}) =>
    setRequestState({
      ...baseRequestState,
      ...obj,
    });

  React.useEffect(() => {
    if (hasValue(url)) {
      const fetchData = async () => {
        updateRequest({
          loading: true,
        });
        try {
          axios[method](url, config).then((res) => {
            window.setTimeout(() => {
              updateRequest({
                success: true,
                response: res.data,
              });
            }, loadingToSuccessDuration);
          });
        } catch (err) {
          updateRequest({
            failed: true,
            errorData: err,
          });
        }
      };

      fetchData();
    }
  }, [config, loadingToSuccessDuration, method, url]);

  return request;
}
