import { Profile } from "@interfaces/user";
import { useAppDispatch, useAppSelector } from ".";
import {
  listMessageSearch as listMessageSearchSelector,
  setListMessageSearch as setListMessageSearchActions,
} from "../redux/slices/searchMessageSlice";

const useSearchMessage = () => {
  const dispatch = useAppDispatch();
  const listMessageSearch = useAppSelector(listMessageSearchSelector);

  const setListMessageSearch = (data:any) => {
    dispatch(setListMessageSearchActions(data));
  };

  return { listMessageSearch, setListMessageSearch };
};

export default useSearchMessage;
