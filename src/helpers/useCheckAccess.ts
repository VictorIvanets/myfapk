import useGetUserInfoInStorage from 'src/hooks/useGetUserInfoInStorage';

const adminId = '66dc52314105cb84bde80276';

export default function useCheckAccess(userId: string | undefined): boolean {
  const currentUser = useGetUserInfoInStorage();
  if (currentUser?._id === userId || currentUser?._id === adminId) return true;
  else return false;
}
