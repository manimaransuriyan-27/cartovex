import { useNavigate } from 'react-router-dom';
import { useLoginMutationQuery } from '../models';
import type { LoginRequest } from '../types';

export const useLoginInteractor = () => {
  const navigate = useNavigate();

  const {
    mutateAsync,
    isPending,
    isError,
    error,
    data,
    failureReason,
    isSuccess,
    status,
    submittedAt,
    context,
  } = useLoginMutationQuery();

  const login = async (payload: LoginRequest) => {
    await mutateAsync(payload);
    navigate('/');
  };

  const errorMessage =
    (isError && (error as any)?.response?.data?.message) || 'Login failed';
  console.log(
    'Error ',
    error,
    ': ',
    failureReason,
    ': ',
    isError,
    ': ',
    status,
    ': ',
    context,
    ': ',
    submittedAt,
    ': ',
    data,
    ': ',
    isSuccess,
  );

  return {
    login,
    isPending,
    isError,
    errorMessage,
  };
};

// export const useLogin = () => {
//   const navigate = useNavigate();

//   const { mutateAsync, isPending, error, isError } = useLoginMutation({
//     onSuccess: () => {
//       navigate('/');
//     },
//   });

//   const loginUser = (payload: LoginPayload) => {
//     return mutateAsync(payload);
//   };

//   const errorMessage =
//     (error as any)?.response?.data?.message || 'Login failed';

//   return {
//     loginUser,
//     isPending,
//     isError,
//     errorMessage,
//   };
// };

// export const useLoginInteractor = () => {
//   const navigate = useNavigate();
//   const { mutateAsync, isPending, error } = useLoginMutation();

//   const login = async (payload: LoginPayload) => {
//     await mutateAsync(payload);
//     onLoginSuccess();
//     navigate('/');
//   };

//   const errorMessage =
//     (error as any)?.response?.data?.message || 'Login failed';

//   return { login, isPending, errorMessage, isError: !!error };
// };
