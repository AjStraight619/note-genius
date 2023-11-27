import Navbar from "@/app/components/ui/navbar/Navbar";

const Dashboard = ({ params }: { params: { userId: string } }) => {
  const { userId } = params;

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Dashboard;
