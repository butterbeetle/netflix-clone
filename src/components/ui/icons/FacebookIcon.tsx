import { FaFacebookF } from "react-icons/fa";
type Props = {
  size?: number;
  className?: string;
};
export default function FacebookIcon({ size, className }: Props) {
  return <FaFacebookF size={size} className={className} />;
}
