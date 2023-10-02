import { BsInstagram } from "react-icons/bs";
type Props = {
  size?: number;
  className?: string;
};
export default function InstagramIcon({ size, className }: Props) {
  return <BsInstagram size={size} className={className} />;
}
