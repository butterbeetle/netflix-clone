import { FcGoogle } from "react-icons/fc";

interface Props {
  size?: number;
}

export default function GoogleIcon({ size = 30 }: Props) {
  return <FcGoogle size={size} />;
}
