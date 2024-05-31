export type HeadItem = {
  id: string;
  label: string;
  resizable?: boolean;
  minWidth?: number | string;
  maxWidth?: number | string;
};

export const HEADS: HeadItem[] = [
  {
    id: "title",
    label: "Title",
    resizable: false,
  },
  {
    id: "slug",
    label: "Slug",
    minWidth: 200,
    maxWidth: 300,
  },
  {
    id: "description",
    label: "Description",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "createdAt",
    label: "CreatedAt",
  },
  {
    id: "updatedAt",
    label: "UpdatedAt",
  },
];

export const DATA = Array.from(new Array(6)).map((_i, indx) => ({
  id: indx + 1,
  title: `Title ${indx + 1}`,
  slug: `Slug ${indx + 1}`,
  status: `Status ${indx + 1}`,
  description: `Description ${indx + 1}`,
  createdAt: `CreatedAt ${indx + 1}`,
  updatedAt: `updatedAt ${indx + 1}`,
}));
