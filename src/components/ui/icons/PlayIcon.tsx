import { BsFillPlayFill } from "react-icons/bs";

interface Props {
  size: number;
}
export default function PlayIcon({ size }: Props) {
  return <BsFillPlayFill size={size} />;
}
