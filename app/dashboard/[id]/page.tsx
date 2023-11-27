import Navbar from "@/app/components/ui/navbar/Navbar";

const Dashboard = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  let userName = "";

  return (
    <div>
      <Navbar userName={userName} userId={userId} />
    </div>
  );
};

export default Dashboard;
