"use client";

import PreviewModal from "@/components/PreviewModal";
import {
  ActorContent,
  Content,
  DetailContent,
  ModalContentVideo,
} from "@/model/Content";
import { FadeLoader } from "react-spinners";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};
export default function Modal({ id }: Props) {
  const router = useRouter();

  const { data: videoData, isLoading: isVideoDataLoading } = useSWR<
    ModalContentVideo[]
  >(`/api/tmdb/movie/${id}/videos`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });

  const { data: detailData, isLoading: isDetailDataLoading } =
    useSWR<DetailContent>(`/api/tmdb/movie/${id}/detail`, fetcher, {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    });

  const { data: actorData, isLoading: isActorDataLoading } = useSWR<
    ActorContent[]
  >(`/api/tmdb/movie/${id}/credits`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });

  const { data: recommendationsData, isLoading: isRecommendationsLoading } =
    useSWR<Content[]>(`/api/tmdb/movie/${id}/recommendations`, fetcher, {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    });

  const { data: similarData, isLoading: isSimilarLoading } = useSWR<Content[]>(
    `/api/tmdb/movie/${id}/similar`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  const loading =
    isVideoDataLoading ||
    isDetailDataLoading ||
    isActorDataLoading ||
    isRecommendationsLoading ||
    isSimilarLoading;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    // document.body.style.width = document.body.clientWidth - 17 + "px";
  }, []);

  const closeHandler = () => {
    document.body.style.overflow = "unset";
    // document.body.style.width = "unset";
    router.back();
  };

  return (
    <>
      {loading && (
        <div className="absolute top-0 left-0 w-full h-auto z-50 bg-black/90 ">
          <div className="flex justify-center top-1/3 relative">
            <FadeLoader color="red" />
          </div>
        </div>
      )}
      {!loading && (
        <div
          className="absolute top-0 left-0 flex justify-center w-full h-full z-50
           bg-black/70 box-border will-change-scroll overflow-y-scroll"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeHandler();
            }
          }}
        >
          <PreviewModal
            onClose={() => closeHandler()}
            videoData={videoData!}
            detailData={detailData!}
            actorData={actorData!}
            recommendationsData={recommendationsData!}
            similarData={similarData!}
          />
        </div>
      )}
    </>
  );
}
