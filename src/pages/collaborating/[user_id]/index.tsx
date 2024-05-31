import React from 'react';
import { useRouter } from 'next/router';
const CollabUrl = () => {
  const router = useRouter();
  const { user_id } = router.query;
  return (
    <>
      <h1>Hii this is url {user_id}</h1>
    </>
  );
};
export default CollabUrl;
