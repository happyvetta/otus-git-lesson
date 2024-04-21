const kolobok = (name) => {
  let str;
  switch (name) {
    case "дедушка":
      str = "Я от дедушки ушёл";
      break;
    case "заяц":
      str = "Я от зайца ушёл";
      break;
    case "лиса":
      str = "Меня съели";
      break;
    default:
      console.log("Нет таких значений");
      break;
  }

  console.log(str);
};

kolobok("дедушка");
kolobok("заяц");
kolobok("лиса");
kolobok("бабушка");

const newYear = (name) => `${name}! ${name}! ${name}!`;

console.log(newYear("Дед Мороз"));
console.log(newYear("Снегурочка"));
