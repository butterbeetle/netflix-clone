import { BsTwitter } from "react-icons/bs";
type Props = {
  size?: number;
  className?: string;
};

export default function TwitterIcon({ size, className }: Props) {
  return <BsTwitter size={size} className={className} />;
}
