// lib/data.ts
export const dummyLines = [
  {
    id: 'line-1',
    name: 'Relationships path',
    courses: [
      {
        id: 'course-1',
        name: 'Emotional literacy',
        versions: [
          { id: 'v1', year: 2022, price: 1300, discount: 40 },
          { id: 'v2', year: 2023, price: 1500, discount: 30 },
        ],
      },
      {
        id: 'course-2',
        name: 'Adam and Eve - Relationship',
        versions: [{ id: 'v3', year: 2021, price: 1200, discount: 20 }],
      },
    ],
  },
  {
    id: 'line-2',
    name: 'Fittra path',
    courses: [
      {
        id: 'course-3',
        name: 'Fittra Therapy GYM',
        versions: [{ id: 'v4', year: 2023, price: 900, discount: 10 }],
      },
    ],
  },
];
