
/*
  this is a file that contains global functions so
  we can easly acces different functions from different
  components
/*

/**
 * returns true if the searchword is in the product object
 * @param {*} searchWord the word (or sentenct) to be searched for
 * @param {*} product the product to search in
 * @returns true if the searchWord is in the product (anywhere)
 */
export function isSearched(searchWord, product) {
  //prop should have searched word and which product to check
  if (searchWord == "") {
    return true;
  } //if they havent searched for anything
  for (const atribute in product) {
    if (typeof product[atribute] == "string") {
      if (product[atribute].toLowerCase().includes(searchWord.toLowerCase())) {
        return true;
      }
    } else if (typeof product[atribute] === "object") {
      if (Array.isArray(product[atribute])) {
        for (let i = 0; i < product[atribute].length; i++) {
          const se = isSearched(searchWord, product[atribute][i]);
          if (se) return true;
        }
      }
    }
  }
  return false;
}

/**
 * sorts the products by different types
 * @param {*} products array of products
 * @param {*} type string that represents how we should sort ex popularity
 */
export function sortProducts(products, type) {
  switch (type) {
    case "Popularitet":
      products.sort(function (a, b) {
        return (
          parseFloat(b.info.analytic.rating) -
          parseFloat(a.info.analytic.rating)
        );
      });
      break;
    case "Pris: Lågt till högt":
      products.sort(function (a, b) {
        return parseFloat(a.price) - parseFloat(b.price);
      });
      break;
    case "Pris: Högt till lågt":
      products.sort(function (a, b) {
        return parseFloat(b.price) - parseFloat(a.price);
      });
      break;
  }

  return products;
}
/**
 * Changes the url (relative)
 * @param {*} url the relative url path
 */
export function changeUrl(url) {
  window.location.href = url;
}
/**
 * function to see if a object is empty or not
 * @param {*} obj object to see
 * @returns true if the object is empty
 */
export function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
}

export function getAlphabeticalCode(amount = 50) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  let code = "";
  for (let i = 0; i <= amount; i++) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return code;
}

export class HashMap {
  constructor() {
    this.list = [];
  }

  /**
   *  adds key value pair if it does not alredy exit
   *  if the key value pair exist it updates the value
   * @param key
   * @param value
   * @returns {boolean}
   */
  put(key, value) {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i][0] === key) {
        this.list[i][1] = value;
        return true;
      }
    }
    let temp = [key, value];
    this.list.push(temp);
  }
  get(key) {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i][0] === key) {
        return this.list[i][1];
      }
    }
    return false;
  }
  keyExist(key) {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i][0] === key) {
        return true;
      }
    }
    return false;
  }

  /**
   * when putting the key the value will count update
   * @param key
   */
  putCounter(key) {
    if (!this.keyExist(key)) {
      this.put(key, 1);
    } else this.put(key, this.get(key) + 1);
  }
  getList() {
    return this.list;
  }
  removeKeys() {
    let list = [];
    for (let i = 0; i < this.list.length; i++) {
      list.push(this.list[i][1]);
    }
    return list;
  }
}

export function removeElementFromArray(array, element) {
  const filteredArray = array.filter((obj) => obj !== element);
  return filteredArray;
}
export function stringArrayToArray(stringArray) {
  return stringArray.substring(1, stringArray.length - 1).split(",");
}

export function isInteger(value) {
  return /^\d+$/.test(value);
}
export function copyObj(obj) {
  return JSON.parse(JSON.stringify(obj));
}
export function getUniqProducts(products) {
  let hashmap = new HashMap();

  products.forEach((prod) => {
    // the product with id 6942069 is a hardcoded product
    // for delivery. it should not be
    if (prod.id !== 6942069) {
      delete prod.orderId;
      hashmap.putCounter(JSON.stringify(prod));
    }
  });

  let newProds = [];

  hashmap.getList().forEach((idk) => {
    let prod = JSON.parse(idk[0]);
    prod["count"] = idk[1];
    newProds.push(prod);
  });

  return newProds;
}
export function isValidEmail(email) {
  // Regular expression pattern for email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);
}
