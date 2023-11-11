import { RingLoader } from "react-spinners";

interface Props {
  color: string;
  size?: number;
}

export default function Spinner({ color, size }: Props) {
  return <RingLoader color={color} size={size} />;
}
