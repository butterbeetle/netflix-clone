import { BsPauseFill } from "react-icons/bs";

type Props = {
  size?: number;
};
export default function PauseIcon({ size }: Props) {
  return <BsPauseFill size={size} />;
}
