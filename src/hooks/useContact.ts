import { Profile } from "@interfaces/user";
import { useAppDispatch, useAppSelector } from ".";

import {
  relations as RelationsSeletor,
  setRelations as setRelationsAction,
} from "../redux/slices/relationSlice";

const useRelations = () => {
  const dispatch = useAppDispatch();
  const relations = useAppSelector(RelationsSeletor);
  const setRelations = (data: any | null) => {
    dispatch(setRelationsAction(data));
  };

  return { relations, setRelations };
};

export default useRelations;
