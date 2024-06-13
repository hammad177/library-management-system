import { getMembersList } from "@/actions/serverActions";
import MembersTable from "@/components/members/member-table";

const Members = async () => {
  const { data } = await getMembersList();

  return <MembersTable data={data as any[]} />;
};

export default Members;
