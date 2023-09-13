import { RingLoader } from "react-spinners";

interface Props {
  color: string;
}

export default function Spinner({ color }: Props) {
  return <RingLoader color={color} />;
}
