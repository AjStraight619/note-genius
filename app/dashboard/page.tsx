"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); // Redirect to home if the user is not authenticated
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  console.log(session);

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {/* Your dashboard content */}
    </div>
  );
};

export default Dashboard;
