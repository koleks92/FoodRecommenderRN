// MEAL CLASS MODEL
export class Meal {
  constructor(
    title,
    type,
    imageUri = false,
    cusine = false,
    restaurant = false,
    price = false,
    description = false,
    recipe = false,
    id,
  ) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.imageUri = imageUri;
    this.cusine = cusine;
    this.restaurant = restaurant;
    this.price = price;
    this.description = description;
    this.recipe = recipe
  }
}
