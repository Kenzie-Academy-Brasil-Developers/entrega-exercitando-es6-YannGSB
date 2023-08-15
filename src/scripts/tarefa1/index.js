const productsList = require('./database.js');

const calculateTotalCost = (customerName, products, discount = 0) => {
  const totalCost = products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const totalWithDiscount = totalCost - (totalCost * discount) / 100;

  if (discount === 0) {
    return `Olá, ${customerName}! O total da sua compra é R$ ${totalCost.toFixed(2)} (sem desconto).`;
  } else {
    return `Olá, ${customerName}! O total da sua compra é R$ ${totalWithDiscount.toFixed(2)} (${discount}% de desconto).`;
  }
};