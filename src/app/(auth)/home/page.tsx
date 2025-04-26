import { getGoal } from "@/app/actions/home/actions";
import HomePage from "./home-page";

export default async function Home() {
  const { data: goalData } = await getGoal();
  const goal = goalData?.[0].goal_number ?? 0;
  return <HomePage goal={goal} />;
}
