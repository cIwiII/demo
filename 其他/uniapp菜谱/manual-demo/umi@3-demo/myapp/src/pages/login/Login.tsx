import React,{ReactNode} from 'react'

interface IProps {
  images?: string;
  name?: string;
  alt?: string;
  children?: ReactNode;
}

const Login:React.FC<IProps> = (props) => {
  const {images, name, alt} = props
  return (
    <div>Login</div>
  )
}
export default Login
// export default function Login() {
//   return (
//     <div>Login</div>
//   )
// }
