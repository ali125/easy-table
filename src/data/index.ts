type HeadItem = {
  id: string;
  label: string;
  minWidth?: number | string;
};

export const HEADS: HeadItem[] = [
  {
    id: "title",
    label: "Title",
  },
  {
    id: "slug",
    label: "Slug",
  },
  {
    id: "description",
    label: "description",
  },
  {
    id: "status",
    label: "status",
  },
  {
    id: "createdAt",
    label: "createdAt",
  },
  {
    id: "updatedAt",
    label: "updatedAt",
  },
];

export const DATA = Array.from(new Array(6)).map((_i, indx) => ({
  id: indx + 1,
  title: `Title ${indx + 1}`,
  slug: `Slug ${indx + 1}`,
  status: `Status ${indx + 1}`,
  createdAt: `CreatedAt ${indx + 1}`,
  updatedAt: `updatedAt ${indx + 1}`,
}));
