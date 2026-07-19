export type ProdutoData = {
    category: 'phones' | 'laptops' | 'monitors';
    name: string;
};

export class Produtos {
    static readonly phones: ProdutoData[] = [
        { category: 'phones', name: 'Samsung galaxy s6' },
        { category: 'phones', name: 'Nokia lumia' },
        { category: 'phones', name: 'Nexus' },
        { category: 'phones', name: 'Samsung galaxy s7' },
        { category: 'phones', name: 'Iphone 6 32gb' },
        { category: 'phones', name: 'Sony xperia z5' },
        { category: 'phones', name: 'HTC One M9' },
    ];

    static readonly laptops: ProdutoData[] = [
        { category: 'laptops', name: 'Sony vaio i5' },
        { category: 'laptops', name: 'Sony vaio i7' },
        { category: 'laptops', name: 'MacBook air' },
        { category: 'laptops', name: 'Dell i7 8gb' },
        { category: 'laptops', name: 'Dell 15.6 Inch' },
    ];

    static readonly monitors: ProdutoData[] = [
        { category: 'monitors', name: 'Apple monitor' },
        { category: 'monitors', name: 'ASUS Full HD' },
    ];

    static readonly all: ProdutoData[] = [...Produtos.phones, ...Produtos.laptops, ...Produtos.monitors];

    static readonly categories: Record<ProdutoData['category'], ProdutoData[]> = {
        phones: Produtos.phones,
        laptops: Produtos.laptops,
        monitors: Produtos.monitors,
    };

    static findByName(name: string): ProdutoData | undefined {
        return Produtos.all.find((produto) => produto.name === name);
    }

    static getByCategory(category: ProdutoData['category']): ProdutoData[] {
        return Produtos.categories[category] || [];
    }
}
