import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from '../libs/api';
import Roadmap from '../components/Roadmap';
import PageHeading from '../components/PageHeading';
import SectionHeadingContent from '../components/SectionHeadingContent';
import TeamEditorModal from '../components/TeamEditorModal';

interface StepSectionProps {
  roadmapDetail: any;
}

const StepSection = ({ roadmapDetail }: StepSectionProps) => {
  return (
    <section className="rounded-2xl bg-white px-6 py-4">
      {/* Step 상단 제목 */}
      <div className="flex justify-between gap-3">
        <div className="flex flex-1 justify-between rounded-2xl bg-tagPurple2 px-3 py-2">
          <span className="text-xl font-semibold">
            <b className="font-bold">Step {roadmapDetail.step}.</b>&nbsp;
            {roadmapDetail.title}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-semibold">
              {roadmapDetail.startTime} - {roadmapDetail.endTime}
            </span>
            <button>
              <img src="/icons/edit-icon.svg" alt="수정 버튼" />
            </button>
          </div>
        </div>
        <button className="rounded-full bg-indigo-600 px-6 font-semibold text-white">
          완료
        </button>
      </div>
      {/* Step 상세 설명 */}
      <p className="min-h-40 mt-4 px-5 leading-8 text-neutral-600">
        {roadmapDetail.introduction}
      </p>
    </section>
  );
};

const MeetingDetail = () => {
  const params = useParams<{ meetingId: string }>();
  const [meetingId, setMeetingId] = useState<number>();
  const [team, setTeam] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamEditValues, setTeamEditValues] = useState<any>({
    teamName: '',
    teamCategory: '',
    teamGoal: '',
    teamSpace1: '',
    teamSpace2: '',
    teamSpace3: '',
  });

  useEffect(() => {
    if (params.meetingId) {
      setMeetingId(parseInt(params.meetingId));
    }
  }, [params]);

  useEffect(() => {
    if (!meetingId) return;
    setLoading(true);
    axios
      .get(`/team/${meetingId}`, {
        headers: { Authorization: localStorage.getItem('accessToken') },
      })
      .then((res) => {
        setTeam(res.data.data);
      })
      .catch((err: any) => setError(err))
      .finally(() => setLoading(false));
  }, [meetingId]);

  useEffect(() => {
    team && console.log(team);
  }, [team]);

  useEffect(() => {
    if (team) {
      setTeamEditValues({
        teamName: team.title,
        teamCategory: team.teamType,
        teamGoal: team.introduction,
        teamSpace1: team.teamSpaceList[0] ? team.teamSpaceList[0].url : '',
        teamSpace2: team.teamSpaceList[1] ? team.teamSpaceList[1].url : '',
        teamSpace3: team.teamSpaceList[2] ? team.teamSpaceList[2].url : '',
      });
    }
  }, [team]);

  if (loading) {
    return (
      <div className="px-14 py-12">
        <div>로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-14 py-12">
        <div>에러 발생</div>
      </div>
    );
  }

  return (
    <>
      {/* 회의 관리 상세 */}
      <div className="px-14 py-12">
        {/* 제목 섹션 */}
        <PageHeading title="나의 회의 관리" previous="관리" hasFilter />
        <div className="flex flex-col space-y-5">
          {/* 헤딩 섹션 */}
          <section className="mt-6 rounded-2xl bg-white px-6 py-4">
            <div className="flex justify-between">
              <SectionHeadingContent
                title={team.title}
                subtitle={team.teamType}
              />
              <button onClick={() => setIsModalOpen(true)}>
                <img src="/icons/edit-icon.svg" alt="수정 버튼" />
              </button>
            </div>
            <div className="mt-4 flex justify-between rounded-md bg-[#E0E1FC] px-4 py-2">
              <span className="font-semibold">
                프로젝트 목표 :&nbsp;
                <span className="font-medium">{team.introduction}</span>
              </span>
              <span>
                {team.roadmap.startTime} - {team.roadmap.endTime}
              </span>
            </div>
          </section>
          {/* 로드맵 섹션 */}
          <section className="rounded-2xl bg-white py-8">
            <h3 className="mb-5 text-center text-2xl font-bold">
              {team.roadmap.title}
            </h3>
            <Roadmap data={team.roadmap.roadmapDetailList} />
          </section>
          {/* Step 섹션 모음 */}
          {team.roadmap.roadmapDetailList.map((roadmapDetail: any) => (
            <StepSection
              key={roadmapDetail.stepId}
              roadmapDetail={roadmapDetail}
            />
          ))}
        </div>
      </div>
      {/* 팀 수정 모달 */}
      {isModalOpen && (
        <TeamEditorModal
          teamId={team.teamId}
          values={teamEditValues}
          setValues={setTeamEditValues}
          teamName={team.title}
          setIsOpen={() => setIsModalOpen(false)}
          apiMode="edit"
        />
      )}
    </>
  );
};

export default MeetingDetail;
