export interface ListType {
    id: number;
    name: string;
    yearOfPublishing: string;
    numberOfPages: number;
    description: string;
    language: string;
    reader: string | null;
    inStock: boolean;
    returnDate: string | null;
    author: string;
}