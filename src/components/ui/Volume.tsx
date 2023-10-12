import VolumeMuteIcon from "./icons/VolumeMuteIcon";
import VolumeUpIcon from "./icons/VolumeUpIcon";

type Props = {
  isMuted: boolean;
};
export default function Volume({ isMuted }: Props) {
  if (isMuted) return <VolumeMuteIcon />;
  else return <VolumeUpIcon />;
}
