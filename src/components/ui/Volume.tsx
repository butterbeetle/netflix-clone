import VolumeMuteIcon from "./icons/VolumeMuteIcon";
import VolumeUpIcon from "./icons/VolumeUpIcon";

type Props = {
  isMuted: boolean;
};
/**
 * Mute 여부에따라 Icon 반환하는 함수
 * @param isMuted Mute인지 아닌지
 * @returns Mute/Volume Icon
 */
export default function Volume({ isMuted }: Props) {
  if (isMuted) return <VolumeMuteIcon />;
  else return <VolumeUpIcon />;
}
