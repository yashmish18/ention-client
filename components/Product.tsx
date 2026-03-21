import React from 'react';

interface ProductProps {
    product: {
        title: string;
        [key: string]: any;
    };
}

const Product: React.FC<ProductProps> = ({ product }) => {
    return (
        <main className="">
            <div className="py-14 px-28 text-white">
                <h1 className="">{product.title}</h1>
            </div>
        </main>
    );
};

export default Product;
