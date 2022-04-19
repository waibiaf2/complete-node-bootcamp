/*replaces template placeholders with product data*/
module.exports = (template, product) => {
    let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%ID%}/g, product.id);

    if(!product.organic) output = output.replace(/{%NOT-ORGANIC%}/g, 'not-organic');
    output = product.organic ? output.replace(/{%ORGANIC_STATUS%}/,'organic'): output.replace(/{%ORGANIC_STATUS%}/,'Inorganic')

    return output;
};

