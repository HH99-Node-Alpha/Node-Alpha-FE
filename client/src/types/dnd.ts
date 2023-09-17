export type TColumn = {
  columnId: string;
  columnName: string;
  columnOrder: number;
  cards: TCard[];
};

export type TCard = {
  cardId: string;
  cardName: string;
};
