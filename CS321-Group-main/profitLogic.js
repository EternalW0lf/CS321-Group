function calculateDishCost(ingredientsForDish) {
  let totalCost = 0;

  ingredientsForDish.forEach((ingredient) => {
    const quantity = parseFloat(ingredient["Quantity Needed"]);
    const unitCost = parseFloat(ingredient["Unit Cost"]);
    totalCost += quantity * unitCost;
  });

  return totalCost;
}

function calculateProfit(cost, price) {
  return price - cost;
}

function calculateMargin(cost, price) {
  if (price === 0) return 0;
  return ((price - cost) / price) * 100;
}

function suggestPrice(cost, targetPercent) {
  return cost / (1 - targetPercent / 100);
}

function analyzeMenuItem(menuItem, ingredientsData, targetPercent) {
  const dishName = menuItem["Dish Name"];
  const price = parseFloat(menuItem["Menu Price"]);
  const unitsSold = parseFloat(menuItem["Units Sold"]);

  const ingredientsForDish = ingredientsData.filter(
    (ingredient) => ingredient["Dish Name"] === dishName
  );

  const cost = calculateDishCost(ingredientsForDish);
  const profitPerUnit = calculateProfit(cost, price);
  const margin = calculateMargin(cost, price);
  const suggestedPrice = suggestPrice(cost, targetPercent);
  const totalProfit = profitPerUnit * unitsSold;

  return {
    dishName: dishName,
    cost: cost,
    price: price,
    unitsSold: unitsSold,
    profitPerUnit: profitPerUnit,
    margin: margin,
    suggestedPrice: suggestedPrice,
    totalProfit: totalProfit
  };
}