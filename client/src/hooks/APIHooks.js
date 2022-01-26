import { useEffect, useState } from "react";
import axios from "axios";

const nounsToLink = (noun, id) => {
  const nouns = {
    art: `${process.env.REACT_APP_API_URL}/museum/popular/${id}`,
    arts: `${process.env.REACT_APP_API_URL}/museum/popular`,
    comment: `${process.env.REACT_APP_API_URL}/comments/${id}`,
    comments: `${process.env.REACT_APP_API_URL}/comments`,
    artComments: `${process.env.REACT_APP_API_URL}/comments/arts/${id}`,
    like: `${process.env.REACT_APP_API_URL}/likes/${id}`,
    likes: `${process.env.REACT_APP_API_URL}/likes`,
    totalLikes: `${process.env.REACT_APP_API_URL}/likes/total/${id}`,
    daily: `${process.env.REACT_APP_API_URL}/museum/daily`,
  };
  return nouns[noun];
};

export const useGET = (noun, id = undefined) => {
  const [data, setData] = useState(null);
  const [loadingGET, setLoadingGET] = useState(true);
  const [errorGET, setErrorGET] = useState(null);
  const link = nounsToLink(noun, id);

  useEffect(() => {
    axios
      .get(link)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => setErrorGET(err))
      .finally(() => setLoadingGET(false));
  }, []);

  return { data, setData, loadingGET, errorGET };
};

export const usePOST = (noun, id) => {
  const [isPosted, setIsPosted] = useState(false);
  const [loadingPOST, setLoadingPOST] = useState(false);
  const [errorPOST, setErrorPOST] = useState(null);
  const link = nounsToLink(noun, id);
  const funcPOST = (body) => {
    setLoadingPOST(true);
    axios
      .post(link, body)
      .then((res) => setIsPosted(true))
      .catch((err) => setErrorPOST(err))
      .finally(() => setLoadingPOST(false));
  };

  return { isPosted, loadingPOST, errorPOST, funcPOST };
};

export const useDELETE = (noun, id) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [errorDELETE, setErrorDELETE] = useState(null);
  const link = nounsToLink(noun, id);
  const funcDELETE = (args) => {
    axios
      .delete(link, {
        data: { ...args },
      })
      .catch((err) => setErrorDELETE(err))
      .finally(() => setIsDeleted(true));
  };

  return { isDeleted, errorDELETE, funcDELETE };
};
