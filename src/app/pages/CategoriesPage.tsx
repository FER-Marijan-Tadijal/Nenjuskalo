import React from "react";
import Link from "next/link";

type category = {
    id: number;
    name: string;
};
type Props = {
    categories: category[];
};

const CategoriesPage = ({ categories }: Props) => {
    return (
        <>
            <br />
            <br />
            <h1>Category Selection</h1>
            <br />
            {categories && (
                <ul>
                    {categories.map((el) => (
                        <li key={el.id}>
                            <Link href={`/categories/${el.id}`}>{el.name}</Link>
                        </li>
                    ))}
                </ul>
            )}

            <br />
            <Link href={"/"}>
                <strong> Go to front page </strong>
            </Link>
        </>
    );
};

export default CategoriesPage;
