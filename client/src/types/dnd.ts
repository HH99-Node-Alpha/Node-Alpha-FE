export type TItemStatus = "todo" | "doing";

export type TItem = {
  id: string;
  status: TItemStatus;
  title: string;
};

export type TList = {
  id: string;
  title: string;
  items: TItem[];
};
