export type TCardStatus = "todo" | "doing";

export type TCard = {
  id: string;
  status: TCardStatus;
  title: string;
};

export type TColumn = {
  id: string;
  title: string;
  cards: TCard[];
};
