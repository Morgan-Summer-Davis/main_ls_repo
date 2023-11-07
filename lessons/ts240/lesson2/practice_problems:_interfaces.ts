interface Author {
  firstName: string;
  lastName: string;
}

interface Book {
  title: string;
  author: Author;
  publicationDate: number;
  genres: string[];
}