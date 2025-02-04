import React, { useEffect } from 'react'
import { useLocation, useParams } from "umi"

function User(props: any) {
  const location = useLocation()
  const params = useParams()
  useEffect(() => {
    console.log(location);
    console.log(params);
    console.log(props);
    
  }, [])
  return (
    <div>User</div>
  )
}

User.wrappers = ['@/wrappers/auth']

// 需要先配置权限,在暴露User
export default User