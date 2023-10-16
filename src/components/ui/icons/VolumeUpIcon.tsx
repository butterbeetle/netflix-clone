import { BsFillVolumeUpFill } from "react-icons/bs";

type Props = {
  size?: number;
};

export default function VolumeUpIcon({ size }: Props) {
  return <BsFillVolumeUpFill size={size} />;
}
