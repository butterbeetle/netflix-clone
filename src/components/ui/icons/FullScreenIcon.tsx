import { BiFullscreen } from "react-icons/bi";
type Props = {
  size?: number;
};
export default function FullScreenIcon({ size }: Props) {
  return <BiFullscreen size={size} />;
}
