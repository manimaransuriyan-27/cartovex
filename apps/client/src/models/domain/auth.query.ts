import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginService } from '../../services';

export const useLoginMutationQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: loginService,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      queryClient.setQueryData(['auth', 'user'], data);
    },
  });
};
