import { useLayoutEffect, useState } from "react";
import { callGetProfile } from "../services/apis/auth";
import { fetchApi } from "../helpers/fetchApi";
import { useAppDispatch } from "../store/hooks";
import { IUser, setProfile } from "../store/slices/profileSlice";

const useCheckAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    const handleCheckAuth = async () => {
      setIsLoading(true);
      const res = await fetchApi(callGetProfile);
      if (res?.data) {
        const payload: IUser = {
          id: res.data?.id,
          email: res.data?.email,
          lastName: res.data?.lastName,
          firstName: res.data?.firstName,
          avatar: res.data?.avatar,
          gender: res.data?.gender,
          birthDate: res.data?.birthDate,
          isActive: res.data?.isActive,
          isPublished: res.data?.isPublished,
          role: res.data?.role,
          permissions: res.data?.permissions,
        };
        dispatch(setProfile(payload));
      }

      setIsLoading(false);
    };

    handleCheckAuth();
  }, [dispatch]);

  return { isLoading };
};

export default useCheckAuth;
