/// <reference types="react" />
interface AuthorCardProps {
    key: number;
    author: {
        img: string;
        name: string;
        link: string;
    };
}
declare const CreatorCard: ({ author }: AuthorCardProps) => JSX.Element;
export default CreatorCard;
