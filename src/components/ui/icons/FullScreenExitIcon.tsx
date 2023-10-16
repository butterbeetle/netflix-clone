import { BiExitFullscreen } from "react-icons/bi";
type Props = {
  size?: number;
};
export default function FullScreenExitIcon({ size }: Props) {
  return <BiExitFullscreen size={size} />;
}
