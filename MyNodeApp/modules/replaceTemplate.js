module.exports = (template, product) => {
  
  
    /* '{%PRODUCTNAME%}' : is for a particualr field
    
      But
      There might be multiple instances of PRODUCTNAME placeholder. So, we will regex here.
      
      /{%PRODUCTNAME%}/ : is a regex which is for 
      
      g : is for global
      
    */
   let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
   output = output.replace(/{%IMAGE%}/g, product.image);
   output = output.replace(/{%PRICE%}/g, product.price);
   output = output.replace(/{%FROM%}/g, product.from);
   output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
   output = output.replace(/{%QUANTITY%}/g, product.quantity);
   output = output.replace(/{%DESCRIPTION%}/g, product.description);
   output = output.replace(/{%ID%}/g, product.id);
   
   if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
   
   return output;
    
  }