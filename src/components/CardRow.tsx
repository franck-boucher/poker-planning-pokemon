import { Card } from "./Card";

export type PointCard = string | null;
const pointCards: PointCard[] = [
  "0",
  "1",
  "2",
  "3",
  "5",
  "8",
  "13",
  "21",
  "34",
  "55",
  "89",
  "?",
];

interface CardRowProps {
  selectedCard: PointCard;
  vote: (num: PointCard) => void;
}
export const CardRow = ({ selectedCard, vote }: CardRowProps) => (
  <div className={`mt-2 flex flex-col md:flex-row gap-2 justify-center`}>
    <div className="flex justify-center items-end gap-2">
      {pointCards.slice(0, 6).map((pointCard) => (
        <Card
          key={pointCard}
          isSelected={pointCard === selectedCard}
          onClick={() => vote(pointCard)}
        >
          {pointCard}
        </Card>
      ))}
    </div>
    <div className="flex justify-center items-end gap-2">
      {pointCards.slice(6, 13).map((pointCard) => (
        <Card
          key={pointCard}
          isSelected={pointCard === selectedCard}
          onClick={() => vote(pointCard)}
        >
          {pointCard}
        </Card>
      ))}
    </div>
  </div>
);
