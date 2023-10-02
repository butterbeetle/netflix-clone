import { BsYoutube } from "react-icons/bs";
type Props = {
  size?: number;
  className?: string;
};

export default function YoutubeIcon({ size, className }: Props) {
  return <BsYoutube size={size} className={className} />;
}
