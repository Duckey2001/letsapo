import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud, Timer, Filter, ShieldCheck, User } from "lucide-react";

const challenges = [
  {
    title: "Web Exploitation: Admin Panel",
    description: "Find the hidden admin panel and gain access.",
    difficulty: "Medium",
    category: "CTF"
  },
  {
    title: "Reverse Engineering: CrackMe",
    description: "Analyze a binary to find the correct password.",
    difficulty: "Hard",
    category: "CTF"
  },
  {
    title: "Hackathon: Health Data Visualizer",
    description: "Build a dashboard to visualize anonymized health data.",
    difficulty: "Easy",
    category: "Hackathon"
  },
  {
    title: "Hackathon: Secure Voting App",
    description: "Design a secure and scalable e-voting system.",
    difficulty: "Hard",
    category: "Hackathon"
  }
];

export default function ChallengeZone() {
  const [filter, setFilter] = useState("");
  const [timer, setTimer] = useState(0);
  const [uploadFile, setUploadFile] = useState(null);
  const [user, setUser] = useState({ name: "Guest", authenticated: false });
  const [score, setScore] = useState(0);

  const filteredChallenges = challenges.filter(
    (challenge) =>
      challenge.title.toLowerCase().includes(filter.toLowerCase()) ||
      challenge.category.toLowerCase().includes(filter.toLowerCase())
  );

  const handleLogin = () => {
    setUser({ name: "Letsapo", authenticated: true });
  };

  const handleSubmit = () => {
    if (user.authenticated) {
      setScore(score + 10);
      alert("Challenge submitted successfully! Score +10");
    } else {
      alert("Please login to submit challenges.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Challenge Zone</h1>
      <div className="flex gap-4 flex-wrap items-center">
        <Input
          placeholder="Search challenges..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-[300px]"
        />

        <div className="flex gap-2 items-center">
          <Filter className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filter by keyword</span>
        </div>

        <div className="flex items-center gap-2">
          <Timer className="text-muted-foreground" />
          <Button onClick={() => setTimer((prev) => prev + 1)} variant="outline">
            Start Practice Timer
          </Button>
          <span className="text-sm text-muted-foreground">Time: {timer} min</span>
        </div>

        <div className="flex items-center gap-2">
          <UploadCloud className="text-muted-foreground" />
          <Input
            type="file"
            onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
            className="w-full sm:w-auto"
          />
          {uploadFile && <span className="text-sm">Uploaded: {uploadFile.name}</span>}
        </div>

        <div className="flex items-center gap-2">
          <User className="text-muted-foreground" />
          <Button onClick={handleLogin} variant="outline">
            {user.authenticated ? `Welcome, ${user.name}` : "Login"}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <ShieldCheck className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Score: {score}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredChallenges.map((challenge, idx) => (
          <Card key={idx} className="rounded-2xl shadow-md">
            <CardContent className="p-4 space-y-2">
              <h2 className="text-lg font-semibold">{challenge.title}</h2>
              <p className="text-sm text-muted-foreground">{challenge.description}</p>
              <div className="flex justify-between items-center">
                <Badge variant="outline">{challenge.difficulty}</Badge>
                <Badge>{challenge.category}</Badge>
              </div>
              <Button
                onClick={handleSubmit}
                variant="default"
                className="w-full mt-2"
              >
                Submit Challenge
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
