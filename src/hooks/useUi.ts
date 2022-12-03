import { Profile } from "@interfaces/user";
import { useAppDispatch, useAppSelector } from ".";
import {
  currentPage as currentPageSelector,
  addMemberGroupChat as addMemberGroupChatSelector,
  loading as loadingSelector,
  imagePreview as imagePreviewSelector,
  isSearchChat as isSearchChatSelector,
  setCurrentPage as setcurrentPageAction,
  currentViewProfile as currentViewProfileSelector,
  setCurrentViewProfile as setCurrentViewProfileAction,
  setIsSearchChat as setIsSearchChatAction,
  setLoading as setLoadingAction,
  setImagePreview as setImagePreviewAction,
  isOpenCreateGroupChat as isOpenCreateGroupChatSelector,
  setIsOpenCreateGroupChat as setIsOpenCreateGroupChatisOpenCreateGroupChatAction,
  setIsOpenAddMemberGroupChat as setIsOpenAddMemberGroupChatAction,
} from "../redux/slices/uiSlice";

const useUi = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(currentPageSelector);
  const isOpenCreateGroupChat = useAppSelector(isOpenCreateGroupChatSelector);
  const currentViewProfile = useAppSelector(currentViewProfileSelector);
  const isSearchChat = useAppSelector(isSearchChatSelector);
  const loading = useAppSelector(loadingSelector);
  const imagePreview = useAppSelector(imagePreviewSelector);
  const addMemberGroupChat = useAppSelector(addMemberGroupChatSelector);
  const setCurrentViewProfile = (value: null | Profile) => {
    dispatch(setCurrentViewProfileAction(value));
  };
  const setIsOpenCreateGroupChat = (value: boolean) => {
    dispatch(setIsOpenCreateGroupChatisOpenCreateGroupChatAction(value));
  };
  const setCurrentPage = (value: string) => {
    dispatch(setcurrentPageAction(value));
  };
  const setIsSearchChat = (value: boolean) => {
    dispatch(setIsSearchChatAction(value));
  };
  const setLoading = (value: boolean) => {
    dispatch(setLoadingAction(value));
  };

  const setImagePreview = (value: string) => {
    dispatch(setImagePreviewAction(value));
  };

  const setIsOpenAddMemberGroupChat = (value: any) => {
    dispatch(setIsOpenAddMemberGroupChatAction(value));
  };

  return {
    currentPage,
    currentViewProfile,
    isSearchChat,
    loading,
    isOpenCreateGroupChat,
    addMemberGroupChat,
    imagePreview,
    setCurrentViewProfile,
    setCurrentPage,
    setLoading,
    setIsSearchChat,
    setImagePreview,
    setIsOpenCreateGroupChat,
    setIsOpenAddMemberGroupChat,
  };
};

export default useUi;
