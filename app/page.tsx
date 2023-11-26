import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { User } from "@prisma/client";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "./components/ui/navbar/Navbar";
type FeatureCardProps = {
  title: string;
  description: string;
};

const HeroSection = () => (
  <div className="relative flex items-center justify-center py-20 overflow-hidden">
    <div className="text-center">
      <div
        className="relative inline-block text-5xl font-bold text-white"
        style={{ textShadow: "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #4f46e5" }}
      >
        <span className="relative z-10">Note Genius</span>
        <div
          className="absolute top-0 -z-10 h-full w-full -translate-x-1/2 rounded-full bg-gradient-radial from-indigo-600 via-transparent to-transparent blur-lg"
          style={{ width: "200%", height: "200%" }}
        ></div>
      </div>
      <p className="mt-6 text-lg text-gray-300">
        The ultimate note-taking solution that leverages AI to enhance your
        productivity.
      </p>
    </div>
  </div>
);

const FeaturesSection = () => (
  <div className="text-white py-12">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        What is Note Genius?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureCard
          title="Note Organization"
          description="Organize your notes in folders with tagging and search functionalities."
        />
        <FeatureCard
          title="GPT-4 Integration"
          description="Rephrase, summarize, and expand your notes with advanced language processing."
        />
        <FeatureCard
          title="Math Tutor"
          description="Solve math problems with step-by-step explanations from Symbolab or Wolfram Alpha."
        />
        <FeatureCard
          title="Handwritten Notes"
          description="Upload and convert handwritten notes to text with Google Vision API."
        />
      </div>
    </div>
  </div>
);

const FeatureCard = ({ title, description }: FeatureCardProps) => (
  <div className="bg-black border border-slate-600 rounded-lg p-6 h-64 hover:cursor-pointer">
    {" "}
    {/* Adjust height as needed */}
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p>{description}</p>
  </div>
);

// FinalCallToAction component
const FinalCallToAction = () => (
  <div className=" text-white py-12">
    <div className="max-w-6xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-8">Ready to get started?</h2>
      <p className="mb-8">
        Join the thousands of individuals improving their note-taking with
        NoteGenius.
      </p>
      <Link href="/signup">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
          Sign Up Now
          <ChevronRightIcon className="w-5 h-5 ml-2" />
        </button>
      </Link>
    </div>
  </div>
);

const getMostRecentChat = async (userId: string | undefined) => {
  "use server";
  if (!userId) {
    redirect("/register");
  }
  const mostRecentChat = prisma.chat.findFirst({
    where: {
      userId: userId,
    },

    orderBy: {
      updatedAt: "desc",
    },

    select: {
      id: true,
    },
  });

  return mostRecentChat;
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  let userId;

  if (session) {
    const user = session.user as User;
    userId = user.id as unknown as string;
    console.log(userId);
  }

  const mostRecentChat = await getMostRecentChat(userId);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-24 relative">
      <Navbar />
      <div className="z-10 flex w-full max-w-5xl flex-col items-center justify-between font-mono text-sm">
        <HeroSection />
        <FeaturesSection />
        {/* <TechnologyStack /> */}

        {/* <HowItWorks /> */}
        {/* <Testimonials /> */}
        <FinalCallToAction />
      </div>
    </main>
  );
}
