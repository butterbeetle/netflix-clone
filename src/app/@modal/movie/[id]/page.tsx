"use client";

import PreviewModal from "@/components/PreviewModal";
import { useParams } from "next/navigation";
import { ModalContent, ModalContentVideo } from "@/model/Content";
import { FadeLoader } from "react-spinners";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function Modal() {
  const { id } = useParams();

  const { data: videoData, isLoading: isVideoDataLoading } = useSWR<
    ModalContentVideo[]
  >(`/api/tmdb/movie/${id}/videos`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });

  const { data: detailData, isLoading: isDetailDataLoading } = useSWR(
    `/api/tmdb/movie/${id}/detail`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  const videoKey = videoData?.[0]?.key;

  console.log(videoData, detailData);
  return (
    <div className="absolute top-0">
      {isVideoDataLoading && (
        <div className="flex justify-center top-1/3 relative">
          <FadeLoader color="white" />
        </div>
      )}
      {!isVideoDataLoading && <div className="text-white text-lg">Hi</div>}
    </div>
    // <PreviewModal
    //   onClose={() => router.back()}
    //   id={238}
    //   genre_ids={[18, 80]}
    //   overview={"overview"}
    //   title={"title"}
    //   backdrop_path={"/tmU7GeKVybMWFButWEGl2M4GeiP.jpg"}
    // />
  );
}
