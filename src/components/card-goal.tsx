import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

type CardGoalProps = {
  goalNumber: number;
};

export default function CardGoal({ goalNumber }: CardGoalProps) {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Meta de licenças</CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="text-5xl font-bold text-primary max-sm:text-4xl ">{goalNumber}</h2>
      </CardContent>
    </Card>
  );
}
